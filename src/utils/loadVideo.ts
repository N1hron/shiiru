export function loadVideo(url: string) {
  const video = document.createElement("video");
  video.src = url;

  return new Promise<HTMLVideoElement>((resolve, reject) => {
    video.oncanplay = () => resolve(video);
    video.onerror = () => reject(new Error("Could not load image from url"));
  }).finally(() => {
    video.oncanplay = () => null;
    video.onerror = () => null;
  });
}