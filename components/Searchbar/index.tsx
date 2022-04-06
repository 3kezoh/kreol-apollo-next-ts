import { Maybe, useSearchLazyQuery, SearchQuery } from "generated/graphql";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-bulma-components";
import styles from "./Searchbar.module.css";

export const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [definitions, setDefinitions] = useState<SearchQuery["search"]>([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [dropdownFocus, setDropdownFocus] = useState(false);

  const [loadSearch] = useSearchLazyQuery({
    fetchPolicy: "cache-and-network",
    onCompleted: ({ search }) => {
      if (search) setDefinitions(search);
    },
  });

  useEffect(() => {
    if (search) {
      loadSearch({ variables: { match: search } });
    } else {
      setDefinitions([]);
    }
  }, [search, loadSearch]);

  return (
    <div className={styles.searchbar} data-cy="search">
      <Form.Input
        placeholder="Start typing here..."
        type="text"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />
      <div
        className={styles.dropdown}
        style={{ display: (inputFocus || dropdownFocus) && definitions.length ? "block" : "none" }}
        onMouseEnter={() => setDropdownFocus(true)}
        onMouseLeave={() => setDropdownFocus(false)}
      >
        {definitions.map(
          (definition) =>
            definition && (
              <div key={definition.id} className="content">
                <Link href={`/word/${encodeURIComponent(definition.word)}`}>
                  <a
                    href={`/word/${encodeURIComponent(definition.word)}`}
                    className={styles.word}
                    data-cy={definition.word}
                  >
                    {definition.word}
                  </a>
                </Link>
                <span className={styles.meaning}>{definition.meaning}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
};
