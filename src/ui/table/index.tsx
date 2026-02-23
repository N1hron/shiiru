import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import { TableHeader } from "./Header";
import { TableBody } from "./Body";
import { TableRow } from "./Row";
import { TableCell } from "./Cell";

import styles from "./style.module.scss";

type TableProps = ComponentPropsWithRef<"table">;

function Table({ className, ...props }: TableProps) {
  const cn = clsx(styles.table, className);
  return <table className={cn} {...props} />;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export { Table };
