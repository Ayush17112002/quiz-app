import styles from "./Error.module.css";

export default function Error({ children }) {
  return (
    <div className={styles.error}>
      <div className={styles.container}>{children}...</div>
    </div>
  );
}
