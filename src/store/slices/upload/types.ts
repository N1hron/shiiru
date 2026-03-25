import type { Interaction } from "@/lib";
import type { UploadedFileData } from "@/types";

export type UploadInteraction = Interaction<"extract-data", File, UploadedFileData>;
