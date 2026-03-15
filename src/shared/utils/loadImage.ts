export function loadImage(url: string, signal?: AbortSignal) {
  const image = document.createElement("img");
  const abortController = new AbortController();
  const signalInner = abortController.signal;

  image.src = url;

  return new Promise<HTMLImageElement>((resolve, reject) => {
    image.addEventListener("load", () => {
      resolve(image);
    }, { signal: signalInner });

    image.addEventListener("error", () => {
      reject(new Error(`Unable to load image from url ${url}`));
    }, { signal: signalInner });

    signal?.addEventListener("abort", () => {
      reject(new Error(`Aborted image load from url ${url}`));
    }, { signal: signalInner });
  }).catch((error) => {
    image.removeAttribute("src");
    throw error;
  }).finally(() => {
    abortController.abort();
  });
}
