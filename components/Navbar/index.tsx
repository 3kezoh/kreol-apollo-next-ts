import { useAuth } from "@Auth";
import Link from "next/link";
import { Button, Columns, Container, Element } from "react-bulma-components";
import DefineButton from "../DefineButton";
import Logo from "../Logo";
import Searchbar from "../Searchbar";
import Browse from "./Browse";
import Categories from "./Categories";
import styles from "./Nav.module.css";

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} role="navigation" aria-label="main navigation">
        <Container breakpoint="desktop" max>
          <Columns>
            <Columns.Column size="one-fifth" />
            <Columns.Column>
              <Container display="flex">
                <Logo />
                <Element renderAs="ul" textColor="white" display="flex">
                  <Browse />
                  <Categories />
                </Element>
              </Container>
            </Columns.Column>
          </Columns>
        </Container>
        <Container breakpoint="desktop" max>
          <Columns>
            <Columns.Column size="one-fifth" />
            <Columns.Column>
              <Container display="flex">
                <Searchbar />
                <DefineButton />
                {user.isAuthenticated && (
                  <Button color="light">
                    <Link href={{ pathname: "/profile", query: { id: user.id } }}>Profile</Link>
                  </Button>
                )}
              </Container>
            </Columns.Column>
          </Columns>
        </Container>
      </nav>
    </header>
  );
};
