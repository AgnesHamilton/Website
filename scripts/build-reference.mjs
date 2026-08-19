import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceDir = "backup/live-html";
const outputDir = "reference-dist";
const origin = "http://127.0.0.1:4174";

const routes = {
  "/": "home.html",
  "/tattoos/": "tattoos.html",
  "/cover-ups/": "cover-ups.html",
  "/booking/": "booking.html",
  "/shop/": "shop.html",
  "/about/": "about.html",
  "/upcoming-events/": "upcoming-events.html",
  "/faq/": "faq.html",
  "/paintings/": "paintings.html",
};

const routeAliases = new Map([
  ["https://www.agneshamilton.com", origin],
  ["https://agneshamilton.com", origin],
  ["http://www.agneshamilton.com", origin],
  ["http://agneshamilton.com", origin],
]);

function rewriteInternalLinks(html) {
  let result = html;
  for (const [from, to] of routeAliases) {
    result = result.replaceAll(from, to);
    result = result.replaceAll(from.replaceAll("/", "\\/"), to.replaceAll("/", "\\/"));
  }
  return result;
}

await rm(outputDir, { recursive: true, force: true });

for (const [route, filename] of Object.entries(routes)) {
  const html = rewriteInternalLinks(await readFile(path.join(sourceDir, filename), "utf8"));
  const routeDir = route === "/" ? outputDir : path.join(outputDir, route);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html);
}

console.log(`Built ${Object.keys(routes).length} navigable reference pages in ${outputDir}/`);
