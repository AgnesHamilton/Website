const widths = [320, 480, 640, 960, 1280, 1600];

export function wixImage(src, width = 960, quality = 82) {
  if (!src?.startsWith("https://static.wixstatic.com/media/") || src.includes("/v1/")) return src;
  const filename = src.split("/").pop();
  return `${src}/v1/fit/w_${width},h_10000,al_c,q_${quality}/${filename}`;
}

export function wixSrcset(src, quality = 82) {
  if (!src?.startsWith("https://static.wixstatic.com/media/") || src.includes("/v1/")) return undefined;
  return widths.map((width) => `${wixImage(src, width, quality)} ${width}w`).join(", ");
}

export function usefulAlt(alt, subject, index = 0) {
  const looksLikeFilename = !alt || /^(img[_ -]|untitled|dsc|image\b|[a-f0-9-]{12,})/i.test(alt);
  return looksLikeFilename ? `${subject} by Agnes Hamilton${index ? `, portfolio image ${index}` : ""}` : alt;
}
