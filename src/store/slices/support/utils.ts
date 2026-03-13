export async function supportsResizeQuality() {
  if (!("createImageBitmap" in globalThis)) return false;

  const canvas = new OffscreenCanvas(8, 1);
  const ctx = canvas.getContext("2d");

  if (!ctx) return false;

  const pixels: Array<ImageDataArray> = [];
  const qualities: Array<ResizeQuality> = ["pixelated", "low", "medium", "high"];

  for (const quality of qualities) {
    const image = new ImageData(new Uint8ClampedArray([0, 0, 0, 255, 255, 255, 255, 255]), 2, 1);

    const bitmap = await createImageBitmap(image, {
      resizeWidth: 8,
      resizeHeight: 1,
      resizeQuality: quality
    });

    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
    pixels.push(ctx.getImageData(4, 0, 1, 1).data);
  }

  const reference = pixels.pop()!;

  for (const pixel of pixels) {
    if (
      pixel[0] !== reference[0] ||
      pixel[1] !== reference[1] ||
      pixel[2] !== reference[2]
    ) {
      return true;
    }
  }

  return false;
}
