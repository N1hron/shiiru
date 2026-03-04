import type { InputFileData, TranslationKey } from "@/types";
import type { SerializedUploaderError } from "./errors";
import type { WorkerRequest, WorkerResponse } from "@/worker-controller/types";

export type UploaderTranslationKey = Extract<TranslationKey, `uploader.${string}`>;
export type UploaderStatusTranslationKey = Extract<TranslationKey, `uploader.status.${string}`>;

export type UploaderRequest = WorkerRequest<"file", File>;
export type UploaderResponse = UploaderResponseSuccess | UploaderResponseError;

export type UploaderResponseSuccess = WorkerResponse<"success", InputFileData>;
export type UploaderResponseError = WorkerResponse<"error", SerializedUploaderError>;
