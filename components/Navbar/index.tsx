import { useAuth } from "@Auth";
import { DefineButton } from "@components/DefineButton";
import { Logo } from "@components/Logo";
import { Searchbar } from "@components/Searchbar";
import Link from "next/link";
import { Button, Columns, Container, Element } from "react-bulma-components";
import Browse from "./Browse";
import { Categories } from "./Categories";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const { user, logout, open } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} role="navigation" aria-label="main navigation">
        <Container breakpoint="desktop" max>
          <Container display="flex" p={3}>
            <Logo />
            <Element renderAs="ul" textColor="white" display="flex">
              <Browse />
              <Categories />
            </Element>
          </Container>
        </Container>
        <Container breakpoint="desktop" max>
          <Container display="flex" p={3}>
            <Searchbar />
            <DefineButton />
            {user.isAuthenticated ? (
              <>
                <Button color="light">
                  <Link href={{ pathname: "/profile", query: { id: user.id } }} passHref>
                    <a data-cy="profile">Profile</a>
                  </Link>
                </Button>
                <Button onClick={logout} data-cy="logout">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={open} data-cy="login">
                Login
              </Button>
            )}
          </Container>
        </Container>
      </nav>
    </header>
  );
};
