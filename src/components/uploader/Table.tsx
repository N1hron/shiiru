import type { ReactNode } from "react";

import { Table } from "@/ui/table";
import { useAppSelector } from "@/store";
import { uploaderSelectors } from "@/store/slices/uploader";

import styles from "./style.module.scss";

type UploaderTableProps = {
  children: ReactNode;
};

export function UploaderTable({ children }: UploaderTableProps) {
  const isHidden = useAppSelector(uploaderSelectors.selectIsEmpty);

  if (isHidden) return null;
  return <Table className={styles.table}>{ children }</Table>;
}
