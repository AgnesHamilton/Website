import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://www.agneshamilton.com";
const OUT_DIR = "backup";
const MIGRATION_DIR = "migration";

function decodeEntities(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function getTag(html, pattern) {
  const match = html.match(pattern);
  return decodeEntities(match?.[1]?.trim() ?? "");
}

function stripHtml(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function slugForUrl(url) {
  const { pathname } = new URL(url);
  return pathname === "/" ? "home" : pathname.replace(/^\/|\/$/g, "").replace(/[^\w.-]+/g, "_");
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Agnes migration audit bot; manual site owner migration",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  return response.text();
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeEntities(match[1]));
}

async function getSitemapUrls() {
  const sitemapIndex = await fetchText(`${BASE_URL}/sitemap.xml`);
  const sitemapUrls = extractLocs(sitemapIndex);
  const childMaps = await Promise.all(
    sitemapUrls.map(async (sitemapUrl) => ({
      sitemapUrl,
      xml: await fetchText(sitemapUrl),
    })),
  );

  return childMaps.flatMap(({ sitemapUrl, xml }) => {
    const type = sitemapUrl.includes("blog") ? "blog" : "page";
    return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
      const block = match[1];
      const loc = getTag(block, /<loc>(.*?)<\/loc>/);
      const lastmod = getTag(block, /<lastmod>(.*?)<\/lastmod>/);
      const images = [...block.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map((image) => decodeEntities(image[1]));
      return { loc, lastmod, type, sitemapUrl, images };
    });
  });
}

async function audit() {
  await mkdir(path.join(OUT_DIR, "live-html"), { recursive: true });
  await mkdir(MIGRATION_DIR, { recursive: true });

  const sitemapEntries = await getSitemapUrls();
  const pages = [];

  for (const entry of sitemapEntries) {
    const html = await fetchText(entry.loc);
    const title = getTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const description = getTag(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)
      || getTag(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i);
    const canonical = getTag(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i);
    const ogImage = getTag(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    const text = stripHtml(html).slice(0, 8000);
    const fileSlug = slugForUrl(entry.loc);

    await writeFile(path.join(OUT_DIR, "live-html", `${fileSlug}.html`), html);
    pages.push({
      ...entry,
      path: new URL(entry.loc).pathname || "/",
      title,
      description,
      canonical,
      ogImage,
      textSample: text,
    });
  }

  const redirectTargets = new Map([
    ["/oldshop", "/shop"],
    ["/updates", "/upcoming-events"],
    ["/forms", "/booking"],
    ["/book-a-consultation", "/booking"],
    ["/book-a-coverup-tattoo", "/cover-ups"],
    ["/tattoo-release-form", "/booking"],
    ["/covid-19-questionnaire", "/booking"],
    ["/raffle", "/"],
    ["/winter-raffle", "/"],
    ["/illustration", "/paintings"],
  ]);

  const redirects = pages
    .filter((page) => page.path !== "/" && (page.path.includes("/single-post/") || redirectTargets.has(page.path)))
    .map((page) => ({
      from: page.path,
      to: page.path.includes("/single-post/") ? "/upcoming-events" : redirectTargets.get(page.path),
      status: 301,
      note: page.path.includes("/single-post/")
        ? "Old Wix blog post. Keep only if rebuilding individual posts; otherwise redirect to the events and updates archive."
        : "Retired Wix utility/promotional page mapped to the closest replacement.",
    }));

  const urlCsv = [
    "type,path,lastmod,title,description,canonical,ogImage",
    ...pages.map((page) => [
      page.type,
      page.path,
      page.lastmod,
      page.title,
      page.description,
      page.canonical,
      page.ogImage,
    ].map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")),
  ].join("\n");

  const redirectCsv = [
    "from,to,status,note",
    ...redirects.map((redirect) => [
      redirect.from,
      redirect.to,
      redirect.status,
      redirect.note,
    ].map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")),
  ].join("\n");

  await writeFile(path.join(OUT_DIR, "site-audit.json"), JSON.stringify({ auditedAt: new Date().toISOString(), pages }, null, 2));
  await writeFile(path.join(MIGRATION_DIR, "url-inventory.csv"), urlCsv);
  await writeFile(path.join(MIGRATION_DIR, "redirect-plan.csv"), redirectCsv);

  console.log(`Audited ${pages.length} URLs.`);
  console.log(`Wrote ${path.join(OUT_DIR, "site-audit.json")}`);
  console.log(`Wrote ${path.join(MIGRATION_DIR, "url-inventory.csv")}`);
  console.log(`Wrote ${path.join(MIGRATION_DIR, "redirect-plan.csv")}`);
}

audit().catch((error) => {
  console.error(error);
  process.exit(1);
});
