export function loadImage(url: string) {
  const image = document.createElement("img");
  image.src = url;

  return new Promise<HTMLImageElement>((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load image from url"));
  }).finally(() => {
    image.onload = () => null;
    image.onerror = () => null;
  });
}