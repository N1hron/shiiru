import { Link } from "@/ui";

import styles from "./style.module.scss";

export function GithubLink() {
  return (
    <Link className={styles.githubLink} href="https://github.com/N1hron/shiiru">
      GitHub page
    </Link>
  );
}
