import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import { Head } from "./Head";
import { Body } from "./Body";
import { Row } from "./Row";
import { Cell } from "./Cell";

import styles from "./style.module.scss";

type TableProps = ComponentPropsWithRef<"table">;

function Table({ className, ...props }: TableProps) {
  const cn = clsx(styles.table, className);
  return <table className={cn} {...props} />;
}

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

export { Table };
