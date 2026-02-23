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
  return (
    <Table.Row className={styles.tableRow}>
      <Table.Cell>
        <UploaderRemoveFile id={file.id} />
      </Table.Cell>

      <Table.Cell alignStart title={file.data.name.stem}>
        { file.data.name.stem }
      </Table.Cell>

      <Table.Cell>
        { file.data.name.ext }
      </Table.Cell>

      <Table.Cell>
        <UploaderPreviewFile id={file.id} />
      </Table.Cell>

      <Table.Cell>
        <UploaderEditFile id={file.id} />
      </Table.Cell>
    </Table.Row>
  );
}

export const UploaderTableBodyRow = memo(UploaderTableBodyRowInner);
