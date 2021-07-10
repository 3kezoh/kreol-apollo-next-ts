import { Element } from "react-bulma-components";
import styles from "./Loader.module.css";

export const Loader = () => (
  <Element display="flex" justifyContent="center">
    <div className={styles.loader}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </Element>
);
