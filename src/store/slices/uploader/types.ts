import type { InputFileData, TranslationKey } from "@/types";
import type { SerializedUploaderError } from "./errors";
import type { WorkerRequest, WorkerResponseError, WorkerResponseSuccess } from "@/types/workers";

export type UploaderTranslationKey = Extract<TranslationKey, `uploader.${string}`>;
export type UploaderStatusTranslationKey = Extract<TranslationKey, `uploader.status.${string}`>;

export type UploaderWorkerRequest = WorkerRequest<"file", File>;
export type UploaderWorkerResponse = UploaderWorkerResponseSuccess | UploaderWorkerResponseError;

export type UploaderWorkerResponseSuccess = WorkerResponseSuccess<"file", InputFileData>;
export type UploaderWorkerResponseError = WorkerResponseError<"file", SerializedUploaderError>;
