import { EditorSelect } from "./EditorSelect";

import styles from "./style.module.scss";

export function Editor() {
  return (
    <section className={styles.editor}>
      <h2 className={styles.title}>Editor</h2>
      <EditorSelect />
      <div></div>
    </section>
  );
}