export async function loadSVG(path, color) {
  if (!path) return;

  const response = await fetch(path);
  const text = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "image/svg+xml");
  const svg = doc.querySelector("svg");
  if (color) svg.style.color = color; // only pass color if css will NEVER specify otherwise. 
  // i have 0 clue if theres a work around.

  if (!svg) 
    return;

  return svg;
}