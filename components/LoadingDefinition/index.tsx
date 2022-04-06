import styles from "./LoadingDefinition.module.css";

export const LoadingDefinition = () => (
  <div className={styles.loading} aria-hidden data-cy="loading" />
);
