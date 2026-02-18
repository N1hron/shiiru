import type { ComponentPropsWithRef } from "react";

import { UploaderFrame } from "./Frame";
import { UploaderHeading } from "./Heading";
import { UploaderDropzone } from "./Dropzone";
import { UploaderDropBackground } from "./DropBackground";

type UploaderProps = Omit<ComponentPropsWithRef<typeof UploaderFrame>, "children">;

export function Uploader(props: UploaderProps) {
  return (
    <UploaderFrame {...props}>
      <UploaderHeading />
      <UploaderDropzone>
        <UploaderDropBackground>
          { null }
        </UploaderDropBackground>
      </UploaderDropzone>
    </UploaderFrame>
  );
}
