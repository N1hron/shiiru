import { memo } from "react";

import { Table } from "@/ui/table";
import { UploaderRemoveFile } from "./RemoveFile";
import { UploaderPreviewFile } from "./PreviewFile";
import { UploaderEditFile } from "./EditFile";
import type { InputFile } from "@/types";

import styles from "./style.module.scss";

type UploaderTableBodyRowProps = {
  file: InputFile;
};

export function UploaderTableBodyRowInner({ file }: UploaderTableBodyRowProps) {
  const fileShort = { id: file.id, name: file.data.name.full };

  return (
    <Table.Row className={styles.tableRow}>
      <Table.Cell>
        <UploaderRemoveFile file={fileShort} />
      </Table.Cell>

      <Table.Cell alignStart title={file.data.name.stem}>
        { file.data.name.stem }
      </Table.Cell>

      <Table.Cell>
        { file.data.name.ext }
      </Table.Cell>

      <Table.Cell>
        <UploaderPreviewFile file={fileShort} />
      </Table.Cell>

      <Table.Cell>
        <UploaderEditFile file={fileShort} />
      </Table.Cell>
    </Table.Row>
  );
}

export const UploaderTableBodyRow = memo(UploaderTableBodyRowInner);
