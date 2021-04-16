import Link from "next/link";
import { useAuth } from "../Auth";
import styles from "./Nav.module.css";
import { Columns, Column, Container, Button, Flex } from "../Bulma";
import LogInButton from "../LogInButton";
import SignUpButton from "../SignUpButton";
import DefineButton from "../DefineButton";
import Searchbar from "../Searchbar";
import Logo from "../Logo";
import Browse from "./Browse";

const Navbar = () => {
  const { user, logout } = useAuth();

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
                  <li></li>
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
                {user.isAuthenticated ? (
                  <Flex>
                    <Button onClick={logout}>Log out</Button>
                    <Link href="/profile">
                      <a href="/profile" className="button is-light">
                        Profile
                      </a>
                    </Link>
                  </Flex>
                ) : (
                  <Flex justifyContent="center">
                    <SignUpButton />
                    <LogInButton />
                  </Flex>
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
