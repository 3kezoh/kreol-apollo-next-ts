import { Flex } from "../Bulma";
import styles from "./Loader.module.css";

const Loader = () => (
  <Flex justifyContent="center">
    <div className={styles.loader}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </Flex>
);

export default Loader;
