import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    "header header header header"
    "main main main main"
    "footer footer footer footer";
  grid-template-rows: 80px 1fr 120px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Header = styled.header`
  grid-area: header;
`;

const Main = styled.main`
  grid-area: main;
  display: flex;
  grid-area: main;
  background: #40444b;
  color: #96989d;
`;

const Footer = styled.footer`
  grid-area: footer;
`;

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Header>Header</Header>
      <Main>{children}</Main>
      <Footer>
        <h4>
          Made with 🤍 by{" "}
          <a target="_blank" href="https://github.com/cristianelias">
            Cris
          </a>
        </h4>
      </Footer>
    </Container>
  );
};
type Props = React.PropsWithChildren<{}>;

export default Layout;
