import { Dropdown } from "@Bulma";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "react-bulma-components";
import styles from "./Browse.module.css";

const Browse = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const [active, setActive] = useState(false);

  return (
    <Dropdown hoverable active={active} data-cy="browse">
      <Button
        aria-haspopup="true"
        aria-controls="alphabet-dropdown"
        onClick={() => setActive(!active)}
        onBlur={() => setActive(false)}
      >
        Browse
      </Button>
      <Dropdown.Menu id="alphabet-dropdown">
        <Dropdown.Content>
          <Dropdown.Item>
            <ul className={styles.alphabet}>
              {alphabet.map((letter) => (
                <li role="none" key={letter}>
                  <Link href={`/popular/${encodeURIComponent(letter)}`}>
                    <a
                      href={`/popular/${encodeURIComponent(letter)}`}
                      className={styles.letter}
                      role="menuitem"
                      data-cy={`${letter}`}
                    >
                      {letter}
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

export default Browse;
