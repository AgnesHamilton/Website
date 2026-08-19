import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceDir = "backup/live-html";
const outputDir = "src/content/updates";
const redirectFile = "public/_redirects";

const yamlString = (value = "") => JSON.stringify(String(value).replace(/\s+/g, " ").trim());
const slugify = (value) => value
  .toLowerCase()
  .replace(/^single-post_/, "")
  .replace(/\.html$/, "")
  .replace(/_/g, "-")
  .replace(/[^a-z0-9-]+/g, "-")
  .replace(/^-|-$/g, "");

const files = (await readdir(sourceDir)).filter((name) => name.startsWith("single-post_") && name.endsWith(".html"));
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const redirects = [];

for (const filename of files) {
  const html = await readFile(path.join(sourceDir, filename), "utf8");
  const jsonScripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let posting;
  for (const match of jsonScripts) {
    try {
      const value = JSON.parse(match[1]);
      const candidates = Array.isArray(value) ? value : value["@graph"] || [value];
      posting = candidates.find((item) => item?.["@type"] === "BlogPosting");
      if (posting) break;
    } catch {}
  }
  if (!posting?.headline || !posting?.datePublished) continue;

  const slug = slugify(filename);
  const published = new Date(posting.datePublished);
  const date = published.toISOString().slice(0, 10);
  const oldUrl = posting.mainEntityOfPage?.url || posting.mainEntityOfPage?.["@id"] || "";
  const oldPath = oldUrl ? new URL(oldUrl).pathname : `/single-post/${slug}`;
  const image = typeof posting.image === "string" ? posting.image : posting.image?.url || "";
  const summary = posting.description || `An update from Agnes Hamilton, originally published ${date}.`;
  const body = `${summary}\n\n_This post was migrated from Agnes’s original Wix site._`;

  const markdown = `---\ntitle: ${yamlString(posting.headline)}\npublished_at: ${date}\nsummary: ${yamlString(summary)}\nimage: ${yamlString(image)}\nold_path: ${yamlString(oldPath)}\npublished: true\n---\n\n${body}\n`;
  await writeFile(path.join(outputDir, `${date}-${slug}.md`), markdown);
  redirects.push(`${oldPath} /upcoming-events/archive/${slug}/ 301`);
}

let redirectSource = await readFile(redirectFile, "utf8");
redirectSource = redirectSource.replace(/\n?# legacy-posts:start[\s\S]*?# legacy-posts:end\n?/g, "\n");
redirectSource += `\n# legacy-posts:start\n${redirects.join("\n")}\n# legacy-posts:end\n`;
await writeFile(redirectFile, redirectSource);

console.log(`Migrated ${redirects.length} legacy posts.`);
