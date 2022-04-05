import { ReactNode } from "react";
import { Columns, Container, Section } from "react-bulma-components";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => (
  <>
    <Navbar />
    <main>
      <Container breakpoint="desktop" max>
        <Section>{children}</Section>
      </Container>
    </main>
  </>
);
