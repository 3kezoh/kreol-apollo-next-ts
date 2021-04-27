import { useEffect, useState } from "react";
import Link from "next/link";
import { useLazyQuery } from "@apollo/client";
import { Input } from "../Bulma";
import styles from "./Searchbar.module.css";
import { SEARCH } from "@apollo/definition/queries";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [dropdownFocus, setDropdownFocus] = useState(false);
  const fetchPolicy = "cache-and-network";
  const onCompleted = ({ search }) => setDefinitions(search);
  const [loadSearch] = useLazyQuery(SEARCH, { fetchPolicy, onCompleted });

  useEffect(() => {
    if (search) {
      loadSearch({ variables: { match: search } });
    } else {
      setDefinitions([]);
    }
  }, [search]);

  return (
    <div className={styles.searchbar}>
      <Input
        placeholder="Start typing here..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />
      <div
        className={styles.dropdown}
        style={{ display: (inputFocus || dropdownFocus) && definitions.length ? "block" : "none" }}
        onMouseEnter={() => setDropdownFocus(true)}
        onMouseLeave={() => setDropdownFocus(false)}
      >
        {definitions.map(({ id, word, meaning }) => (
          <div key={id} className="content">
            <Link href={`/word/${encodeURIComponent(word)}`}>
              <a href={`/word/${encodeURIComponent(word)}`} className={styles.word}>
                {word}
              </a>
            </Link>
            <span className={styles.meaning}>{meaning}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
