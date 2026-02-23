import { Table } from "@/ui/table";

import styles from "./style.module.scss";
import { Translation } from "@/ui/translation";

export function UploaderTableHeader() {
  return (
    <Table.Header className={styles.tableHeader}>
      <Table.Row className={styles.tableRow}>
        <Table.Cell />
        <Table.Cell as="th"><Translation params={["uploader.file.name"]} /></Table.Cell>
        <Table.Cell as="th"><Translation params={["uploader.file.type"]} /></Table.Cell>
        <Table.Cell colSpan={2} />
      </Table.Row>
    </Table.Header>
  );
}
