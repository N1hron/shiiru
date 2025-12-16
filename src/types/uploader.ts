export type InputFile = {
  name: string;
  mime: string;
  type: "image" | "video";
  width: number;
  height: number;
  duration: number;
  url: string;
};