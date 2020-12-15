import Link from "next/link";
import { useAuth } from "../Auth";
import styles from "./Nav.module.css";
import { Columns, Column, Container, Button, Flex } from "../Bulma";
import LogInButton from "../LogInButton";
import SignUpButton from "../SignUpButton";
import DefineButton from "../DefineButton";
import Searchbar from "../Searchbar";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <nav className="has-background-dark" role="navigation" aria-label="main navigation">
        <Container isMaxDesktop>
          <Columns>
            <Column isOneFifth>
              <Flex justifyContent="center">
                <Link href="/">
                  <a href="/" className="button is-light">
                    Home
                  </a>
                </Link>
              </Flex>
            </Column>
            <Column>
              <Flex>
                <Searchbar />
                <DefineButton />
                {user.isAuthenticated ? (
                  <Button onClick={logout}>Log out</Button>
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
