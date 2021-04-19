import Link from "next/link";
import { useAuth } from "../Auth";
import styles from "./Nav.module.css";
import { Columns, Column, Container, Flex } from "../Bulma";
import DefineButton from "../DefineButton";
import Searchbar from "../Searchbar";
import Logo from "../Logo";
import Browse from "./Browse";
import Categories from "./Categories";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <nav id={styles.nav} role="navigation" aria-label="main navigation">
        <Container isMaxDesktop>
          <Columns>
            <Column isOneFifth />
            <Column>
              <Flex>
                <Logo />
                <ul className={styles.list}>
                  <Browse />
                  <Categories />
                </ul>
              </Flex>
            </Column>
          </Columns>
        </Container>
        <Container isMaxDesktop>
          <Columns>
            <Column isOneFifth />
            <Column>
              <Flex>
                <Searchbar />
                <DefineButton />
                {user.isAuthenticated && (
                  <Link href="/profile">
                    <a href="/profile" className="button is-light">
                      Profile
                    </a>
                  </Link>
                )}
              </Flex>
            </Column>
          </Columns>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
