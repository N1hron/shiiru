import type { Interaction } from "@/lib";
import type { UploadedFileData } from "@/types";
import type { SerializedUploadError } from "./errors";

export type UploadInteraction = Interaction<"data:extract", File, UploadedFileData, Error | SerializedUploadError>;
