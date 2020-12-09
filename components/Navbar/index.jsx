import styles from "./Nav.module.css";
import { Columns, Column, Container } from "../Bulma";

const Navbar = () => (
  <header className={styles.header}>
    <nav className="has-background-dark">
      <Container isMaxDesktop>
        <Columns>
          <Column isOneFifth>Logo</Column>
          <Column>
            <div className="is-flex">
              <div className="searchbar">Searchbar</div>
              <a href="/define" className="button">
                +
              </a>
            </div>
          </Column>
        </Columns>
      </Container>
    </nav>
  </header>
);

export default Navbar;
