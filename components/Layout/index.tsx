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
        <Columns>
          <Columns.Column size="one-fifth" mobile={{ display: "hidden" }}>
            <Sidebar />
          </Columns.Column>
          <Columns.Column desktop={{ size: "two-thirds" }} tablet={{ size: "four-fifths" }}>
            <Section>{children}</Section>
          </Columns.Column>
        </Columns>
      </Container>
    </main>
  </>
);
