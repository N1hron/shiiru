export function seekVideo(video: HTMLVideoElement, time: number): Promise<HTMLVideoElement> {
  return new Promise((resolve) => {
    video.currentTime = time;

    video.addEventListener("seeked", () => {
      resolve(video);
    }, { once: true });
  });
}