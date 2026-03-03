import type { Dimensions, Segment, Rect } from "./common";

export type FileName = { full: string; stem: string; ext: string };
export type FileType = "image" | "video";

export type FileElement<T extends FileType = FileType> =
  T extends "image" ? HTMLImageElement :
  T extends "video" ? HTMLVideoElement : never;

export type InputFileData = {
  name: FileName;
  type: FileType;
  mime: string;
  size: number;
  dimensions: Dimensions;
  duration: number;
};

export type InputFileConfig = {
  name: FileName;
  crop: Rect;
  trim: Segment;
};

export type InputFile = {
  id: string;
  signature: string;
  data: InputFileData;
  config: InputFileConfig;
  url: string;
};
