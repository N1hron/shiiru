import { Table } from "@/ui/table";
import { Translation } from "@/ui/translation";

import styles from "./style.module.scss";

export function UploaderTableHeader() {
  return (
    <Table.Header className={styles.tableHeader}>
      <Table.Row className={styles.tableRow}>
        <Table.Cell />
        <Table.Cell as="th"><Translation translationKey="uploader.file.name" /></Table.Cell>
        <Table.Cell as="th"><Translation translationKey="uploader.file.type" /></Table.Cell>
        <Table.Cell colSpan={2} />
      </Table.Row>
    </Table.Header>
  );
}
