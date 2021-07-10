import Link from "next/link";
import { useState } from "react";
import { Dropdown } from "../../Bulma/Dropdown";
import styles from "./Categories.module.css";

export const Categories = () => {
  const categories = ["lorem", "ipsum", "dolor", "sit", "amet"];
  const [active, setActive] = useState(false);

  return (
    <Dropdown hoverable active={active}>
      <button
        className={styles.button}
        type="button"
        aria-haspopup="true"
        aria-controls="categorie-dropdown"
        onClick={() => setActive(!active)}
        onBlur={() => setActive(false)}
      >
        Categories
      </button>
      <Dropdown.Menu id="categorie-dropdown">
        <Dropdown.Content>
          <Dropdown.Item>
            <ul className={styles.categories}>
              {categories.map((categorie) => (
                <li role="none" key={categorie}>
                  <Link href={`/categorie/${encodeURIComponent(categorie)}`}>
                    <a
                      href={`/categorie/${encodeURIComponent(categorie)}`}
                      className={styles.categorie}
                      role="menuitem"
                    >
                      {categorie}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Menu>
    </Dropdown>
  );
};
