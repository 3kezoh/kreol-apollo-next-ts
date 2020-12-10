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
      <nav className="has-background-dark">
        <Container isMaxDesktop>
          <Columns>
            <Column isOneFifth>Logo</Column>
            <Column>
              <Flex>
                <Searchbar />
                <DefineButton />
                {user.isAuthenticated ? (
                  <Button onClick={logout}>Log out</Button>
                ) : (
                  <Flex>
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
