import { readFile, writeFile } from "node:fs/promises";

const pages = {
  "/": "home.html",
  "/tattoos": "tattoos.html",
  "/cover-ups": "cover-ups.html",
  "/shop": "shop.html",
  "/about": "about.html",
  "/upcoming-events": "upcoming-events.html",
  "/faq": "faq.html",
  "/paintings": "paintings.html",
};

const excludedIds = new Set([
  "b1cd13f9d4dfb1450bbb325285106177.png",
  "8d6893330740455c96d218258a458aa4.png",
  "41554d_dad6bace788c4854abee603fb675eecc~mv2.png",
  "41554d_5d09bbaab191498ea369af5d36e3b328~mv2.jpg",
]);

const output = {};

for (const [route, filename] of Object.entries(pages)) {
  const html = await readFile(`backup/live-html/${filename}`, "utf8");
  const images = [];
  const seen = new Set();

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1]?.replaceAll("&amp;", "&");
    if (!src?.includes("static.wixstatic.com/media/")) continue;
    const id = src.match(/\/media\/([^/?]+)/)?.[1]?.replaceAll("%7E", "~");
    if (!id || excludedIds.has(id) || seen.has(id)) continue;
    const width = Number(src.match(/(?:^|[,/])w_(\d+)/)?.[1] || 999);
    const height = Number(src.match(/(?:^|[,/])h_(\d+)/)?.[1] || 999);
    if (width < 120 || height < 100) continue;
    seen.add(id);
    const alt = (tag.match(/\balt=["']([^"']*)["']/i)?.[1] || "Artwork by Agnes Hamilton")
      .replaceAll("&quot;", '"').replaceAll("&amp;", "&");
    images.push({ src: `https://static.wixstatic.com/media/${id}`, alt });
  }
  output[route] = images;
}

await writeFile("src/legacy-media.json", `${JSON.stringify(output, null, 2)}\n`);
for (const [route, images] of Object.entries(output)) console.log(`${route}: ${images.length} images`);
