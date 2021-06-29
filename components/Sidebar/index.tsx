import { Element, Menu } from "react-bulma-components";
import styles from "./Sidebar.module.css";

export const Sidebar = () => (
  <Element display="flex" justifyContent="center">
    <aside className={styles.fixed}>
      <Menu>
        <p className="menu-label">Categories</p>
        <Menu.List>
          <Menu.List.Item href="/lorem">lorem</Menu.List.Item>
          <Menu.List.Item href="/ipsum">ipsum</Menu.List.Item>
          <Menu.List.Item href="/dolor">dolor</Menu.List.Item>
          <Menu.List.Item href="/sit">sit</Menu.List.Item>
          <Menu.List.Item href="/sit">amet</Menu.List.Item>
        </Menu.List>
      </Menu>
    </aside>
  </Element>
);
