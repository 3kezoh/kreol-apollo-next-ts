import { useState } from "react";
import Link from "next/link";
import styles from "./Categories.module.css";
import { Dropdown, DropdownContent, DropdownItem, DropdownMenu } from "../../Bulma/Dropdown";

const Categories = () => {
  const categories = ["lorem", "ipsum", "dolor", "sit", "amet"];
  const [isActive, setIsActive] = useState(false);

  return (
    <Dropdown el="li" isHoverable isActive={isActive}>
      <button
        className={styles.button}
        type="button"
        aria-haspopup="true"
        aria-controls="categorie-dropdown"
        onClick={() => setIsActive(!isActive)}
        onBlur={() => setIsActive(false)}
      >
        Categories
      </button>
      <DropdownMenu id="categorie-dropdown">
        <DropdownContent>
          <DropdownItem>
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
          </DropdownItem>
        </DropdownContent>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Categories;
