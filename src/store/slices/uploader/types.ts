import type { InputFileData, TranslationKey } from "@/types";

export type UploaderTranslationKey = Extract<TranslationKey, `uploader.${string}`>;
export type UploaderStatusTranslationKey = Extract<TranslationKey, `uploader.status.${string}`>;

export type UploaderWorkerRequest = {
  file: File;
};

export type UploaderWorkerResponseSuccess = {
  type: "success";
  data: InputFileData;
};

export type UploaderWorkerResponseError = {
  type: "error";
  error: unknown;
};

export type UploaderWorkerResponse = UploaderWorkerResponseSuccess | UploaderWorkerResponseError;
