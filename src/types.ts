export type FileData = {
  name: {
    full: string;
    stem: string;
    ext: string;
  };
  mime: string;
  size: number;
  type: "video" | "image";
  duration: number;
  width: number;
  height: number;
  url: string;
};