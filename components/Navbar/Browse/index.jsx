import { useState } from "react";
import Link from "next/link";
import styles from "./Browse.module.css";
import { Dropdown, DropdownContent, DropdownItem, DropdownMenu } from "../../Bulma/Dropdown";

const Browse = () => {
  const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
  const [isActive, setIsActive] = useState(false);

  return (
    <Dropdown el="li" isHoverable isActive={isActive}>
      <button
        className={styles.button}
        type="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={() => setIsActive(!isActive)}
        onBlur={() => setIsActive(false)}
      >
        Browse
      </button>
      <DropdownMenu id="dropdown-menu">
        <DropdownContent>
          <DropdownItem>
            <ul className={styles.alphabet}>
              {alphabet.map((letter) => (
                <li role="none" key={letter}>
                  <Link href={`/popular/${encodeURIComponent(letter)}`}>
                    <a href="/popular" className={styles.letter} role="menuitem">
                      {letter}
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

export default Browse;
