import { Table } from "@/ui/table";
import { UploaderTableBodyRow } from "./TableBodyRow";
import { useAppSelector } from "@/store";
import { uploaderSelectors } from "@/store/slices/uploader";

import styles from "./style.module.scss";

export function UploaderTableBody() {
  const files = useAppSelector(uploaderSelectors.selectFiles);

  return (
    <Table.Body className={styles.tableBody}>
      { files.map((file) => <UploaderTableBodyRow key={file.id} file={file} />) }
    </Table.Body>
  );
}
