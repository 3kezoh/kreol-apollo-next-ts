import { Container, Columns, Column, Section } from "@Bulma";
import { Navbar, Sidebar } from "@components";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>
      <Container isMaxDesktop>
        <Columns>
          <Column isOneFifth isHiddenMobile>
            <Sidebar />
          </Column>
          <Column isTwoThirds="desktop" isFourFifths="tablet">
            <Section>{children}</Section>
          </Column>
        </Columns>
      </Container>
    </main>
  </>
);

export default Layout;
