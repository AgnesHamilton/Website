import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { pages, redirects } from "../src/content.js";

const DIST = "dist";
const CANONICAL_ORIGIN = "https://www.agneshamilton.com";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pageHref(pagePath) {
  return pagePath === "/" ? "/" : `${pagePath}/`;
}

function navHtml(currentPath) {
  const navItems = pages.filter((page) => page.nav);
  return navItems.map((page) => {
    const active = page.path === currentPath ? " aria-current=\"page\"" : "";
    return `<a href="${pageHref(page.path)}"${active}>${escapeHtml(page.nav)}</a>`;
  }).join("");
}

function renderGallery(items = []) {
  if (!items.length) return "";
  return `<div class="gallery">${items.map((item) => `
    <figure>
      <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" loading="lazy">
      <figcaption>${escapeHtml(item.caption || item.alt)}</figcaption>
    </figure>
  `).join("")}</div>`;
}

function renderPage(page) {
  const canonical = `${CANONICAL_ORIGIN}${page.path === "/" ? "/" : page.path}`;
  const sections = page.sections.map((section) => `
    <section class="${section.kind || "section"}">
      <div class="section-copy">
        <h2>${escapeHtml(section.heading)}</h2>
        ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        ${section.actions ? `<div class="actions">${section.actions.map((action) => `<a class="${action.primary ? "button primary" : "button"}" href="${escapeHtml(action.href)}">${escapeHtml(action.label)}</a>`).join("")}</div>` : ""}
      </div>
      ${renderGallery(section.gallery)}
    </section>
  `).join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/">
      <span>Agnes Hamilton</span>
      <small>Tattoos & Fine Art</small>
    </a>
    <nav aria-label="Main navigation">${navHtml(page.path)}</nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-copy">
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.lede)}</p>
        <div class="actions">
          <a class="button primary" href="/booking/">Book a Tattoo</a>
          <a class="button" href="/tattoos/">View Tattoos</a>
        </div>
      </div>
      <figure class="hero-media">
        <img src="${escapeHtml(page.heroImage.src)}" alt="${escapeHtml(page.heroImage.alt)}">
      </figure>
    </section>
    ${sections}
  </main>

  <footer class="site-footer">
    <p>Agnes Hamilton Tattoos & Fine Art, Portland, Oregon</p>
    <a href="mailto:info@agneshamilton.com">info@agneshamilton.com</a>
    <a href="https://www.instagram.com/aggie.q.tattoo/">Instagram</a>
  </footer>
</body>
</html>`;
}

async function writePage(page) {
  const dir = page.path === "/" ? DIST : path.join(DIST, page.path);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), renderPage(page));
}

async function build() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(path.join(DIST, "assets"), { recursive: true });
  await Promise.all(pages.map(writePage));
  await writeFile(path.join(DIST, "assets", "styles.css"), await import("../src/styles.js").then((module) => module.css));
  await writeFile(path.join(DIST, "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#181416"/><path fill="#fffaf7" d="M15 49 28 14h8l13 35h-8l-3-9H26l-3 9h-8Zm13-15h8l-4-12-4 12Z"/></svg>`);
  await writeFile(path.join(DIST, "_redirects"), redirects.map((redirect) => `${redirect.from} ${redirect.to} ${redirect.status}`).join("\n") + "\n");
  await writeFile(path.join(DIST, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://www.agneshamilton.com/sitemap.xml\n");
  await writeFile(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${CANONICAL_ORIGIN}${page.path === "/" ? "/" : page.path}</loc></url>`).join("\n")}
</urlset>
`);
  console.log(`Built ${pages.length} pages in ${DIST}/`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
