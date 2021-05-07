import { Container, Columns, Column, Section } from "@Bulma";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

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
