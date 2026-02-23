import type { TranslationKey } from "@/types";

export type UploaderTranslationKey = Extract<TranslationKey, `uploader.${string}`>;
export type UploaderStatusTranslationKey = Extract<TranslationKey, `uploader.status.${string}`>;
