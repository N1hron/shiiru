import type { ComponentPropsWithRef } from "react";

import { UploaderFrame } from "./Frame";
import { UploaderHeading } from "./Heading";
import { UploaderDropzone } from "./Dropzone";
import { UploaderDropBackground } from "./DropBackground";
import { UploaderStatus } from "./Status";
import { UploaderFileCount } from "./FileCount";
import { UploaderFileInput } from "./FileInput";

type UploaderProps = Omit<ComponentPropsWithRef<typeof UploaderFrame>, "children">;

export function Uploader(props: UploaderProps) {
  return (
    <UploaderFrame {...props}>
      <UploaderHeading />
      <UploaderDropzone>
        <UploaderDropBackground>
          <UploaderStatus />
          <UploaderFileCount />
        </UploaderDropBackground>
        <UploaderFileInput />
      </UploaderDropzone>
    </UploaderFrame>
  );
}
