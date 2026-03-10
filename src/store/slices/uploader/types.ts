import type { InputFileData, TranslationKey } from "@/types";
import type { SerializedUploaderError } from "./errors";
import type { Request, Response } from "@/messenger/types";

export type UploaderTranslationKey = Extract<TranslationKey, `uploader.${string}`>;
export type UploaderStatusTranslationKey = Extract<TranslationKey, `uploader.status.${string}`>;

export type UploaderRequest = Request<"extract-data", File>;
export type UploaderResponse = Response<"extract-data", InputFileData, SerializedUploaderError>;
