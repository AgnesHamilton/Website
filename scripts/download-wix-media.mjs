import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const BACKUP_DIR = "backup";
const HTML_DIR = path.join(BACKUP_DIR, "live-html");
const MEDIA_DIR = path.join(BACKUP_DIR, "media");

function decodeEntities(value = "") {
  return value
    .replace(/\\u002F/g, "/")
    .replace(/\\\//g, "/")
    .replace(/&amp;/g, "&")
    .replace(/%7E/gi, "~")
    .replace(/%2F/gi, "/")
    .replace(/%2C/gi, ",");
}

function normalizeWixMediaUrl(rawUrl) {
  let url = decodeEntities(rawUrl).replace(/[)",'<>\\]+$/g, "");
  const marker = "/v1/";
  const markerIndex = url.indexOf(marker);

  if (markerIndex !== -1) {
    const base = url.slice(0, markerIndex);
    const fileName = url.split("/").pop();
    if (fileName && fileName.includes(".")) {
      return `${base}/${fileName}`;
    }
    return base;
  }

  const parsed = new URL(url);
  const parts = parsed.pathname.split("/");
  const mediaIndex = parts.indexOf("media");
  if (mediaIndex !== -1 && parts[mediaIndex + 1]) {
    parsed.pathname = parts.slice(0, mediaIndex + 2).join("/");
    parsed.search = "";
    return parsed.toString();
  }

  return url;
}

function extensionFor(contentType, url) {
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname).toLowerCase();
  if (ext && ext.length <= 6) return ext;
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("svg")) return ".svg";
  return ".jpg";
}

function safeName(url, contentType) {
  const parsed = new URL(url);
  const originalName = path.basename(parsed.pathname).replace(/[^a-zA-Z0-9._-]/g, "_");
  const stem = originalName.replace(/\.[^.]+$/, "");
  return `${stem || "wix-media"}${extensionFor(contentType, url)}`;
}

async function collectUrls() {
  const urls = new Set();

  const audit = JSON.parse(await readFile(path.join(BACKUP_DIR, "site-audit.json"), "utf8"));
  for (const page of audit.pages ?? []) {
    if (page.ogImage) urls.add(page.ogImage);
    for (const image of page.images ?? []) urls.add(image);
  }

  const htmlFiles = await readdir(HTML_DIR);
  for (const file of htmlFiles.filter((name) => name.endsWith(".html"))) {
    const html = await readFile(path.join(HTML_DIR, file), "utf8");
    const matches = html.match(/https?:\\?\/\\?\/static\.wixstatic\.com\\?\/media\\?\/[^"' <>)]+/g) ?? [];
    for (const match of matches) {
      const normalized = normalizeWixMediaUrl(match);
      if (/\.(jpe?g|png|webp|gif|svg)(\?|$)/i.test(normalized)) {
        urls.add(normalized);
      }
    }
  }

  return [...urls].sort();
}

async function fetchWithFallback(url) {
  const response = await fetch(url);
  if (response.ok) return { response, url };

  const encoded = url.replace(/~/g, "%7E");
  if (encoded !== url) {
    const encodedResponse = await fetch(encoded);
    if (encodedResponse.ok) return { response: encodedResponse, url: encoded };
  }

  throw new Error(`${response.status} ${response.statusText}`);
}

async function download() {
  await rm(MEDIA_DIR, { recursive: true, force: true });
  await mkdir(MEDIA_DIR, { recursive: true });
  const urls = await collectUrls();
  const rows = [];
  let saved = 0;
  let failed = 0;

  for (const url of urls) {
    try {
      const { response, url: fetchedUrl } = await fetchWithFallback(url);
      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.startsWith("image/")) {
        rows.push({ sourceUrl: url, file: "", status: "skipped", note: contentType });
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      const file = safeName(fetchedUrl, contentType);
      const outputPath = path.join(MEDIA_DIR, file);
      const existing = await stat(outputPath).catch(() => null);
      if (!existing || existing.size < buffer.length) {
        await writeFile(outputPath, buffer);
      }
      rows.push({ sourceUrl: url, file: path.join("backup/media", file), status: "saved", note: `${contentType}; ${buffer.length} bytes` });
      saved += 1;
    } catch (error) {
      rows.push({ sourceUrl: url, file: "", status: "failed", note: error.message });
      failed += 1;
    }
  }

  const csv = [
    "sourceUrl,file,status,note",
    ...rows.map((row) => [row.sourceUrl, row.file, row.status, row.note].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")),
  ].join("\n");

  await writeFile(path.join(BACKUP_DIR, "media-manifest.csv"), csv);
  console.log(`Found ${urls.length} candidate media URLs.`);
  console.log(`Saved ${saved} files to ${MEDIA_DIR}/.`);
  console.log(`Failed ${failed} downloads.`);
  console.log(`Wrote ${path.join(BACKUP_DIR, "media-manifest.csv")}`);
}

download().catch((error) => {
  console.error(error);
  process.exit(1);
});
