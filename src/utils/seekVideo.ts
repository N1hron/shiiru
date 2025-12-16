export function seekVideo(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve) => {
    video.currentTime = time;

    video.addEventListener("seeked", () => {
      resolve();
    }, { once: true });
  });
}