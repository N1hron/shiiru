import type { ComponentPropsWithRef } from "react";

import { UploaderFrame } from "./Frame";
import { UploaderHeading } from "./Heading";
import { UploaderDropzone } from "./Dropzone";
import { UploaderTable } from "./Table";
import { UploaderTableHeader } from "./TableHeader";
import { UploaderTableBody } from "./TableBody";
import { UploaderFileInput } from "./FileInput";
import { UploaderPad } from "./Pad";

type UploaderProps = Omit<ComponentPropsWithRef<typeof UploaderFrame>, "children">;

export function Uploader(props: UploaderProps) {
  return (
    <UploaderFrame {...props}>
      <UploaderHeading />
      <UploaderDropzone>
        <UploaderTable>
          <UploaderTableHeader />
          <UploaderTableBody />
        </UploaderTable>
        <UploaderPad />
      </UploaderDropzone>
      <UploaderFileInput />
    </UploaderFrame>
  );
}
