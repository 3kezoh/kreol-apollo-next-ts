import styles from "./Sidebar.module.css";
import { Flex } from "../Bulma";

const Sidebar = () => (
  <Flex justifyContent="center">
    <aside className={styles.fixed}>
      <div className="menu">
        <p className="menu-label">Categories</p>
        <ul className="menu-list">
          <li>
            <a href="/lorem">lorem</a>
            <a href="/ipsum">ipsum</a>
            <a href="/dolor">dolor</a>
            <a href="/sit">sit</a>
            <a href="/amet">amet</a>
          </li>
        </ul>
      </div>
    </aside>
  </Flex>
);

export default Sidebar;
