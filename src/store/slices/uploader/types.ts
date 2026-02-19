import type { TranslationKey } from "@/types";

export type UploaderTranslationKey = Extract<TranslationKey, `uploader.${string}`>;
export type UploaderStatusTranslationKey = UploaderTranslationKey extends `uploader.status.${infer K}` ? K : never;
