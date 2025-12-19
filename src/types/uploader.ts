export type InputFile = {
  name: string;
  mime: string;
  type: "image" | "video";
  width: number;
  height: number;
  duration: number;
  url: string;
};

export type UploaderItem = InputFile & {
  id: string;
  previewStatus: "loading" | "success" | "error";
};

export type UploadErrorType = "no-space" | "unsupported-file";