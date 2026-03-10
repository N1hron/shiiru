import type { InputFileData, TranslationKey } from "@/types";
import type { SerializedUploaderError } from "./errors";
import type { WorkerRequest, WorkerResponse } from "@/worker-messenger/types";

export type UploaderTranslationKey = Extract<TranslationKey, `uploader.${string}`>;
export type UploaderStatusTranslationKey = Extract<TranslationKey, `uploader.status.${string}`>;

export type UploaderRequest = WorkerRequest<"extract-data", File>;
export type UploaderResponse = WorkerResponse<"extract-data", InputFileData, SerializedUploaderError>;
