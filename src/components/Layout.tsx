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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.main`
  grid-area: main;
  display: flex;
  grid-area: main;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: #f5f5f5;
`;

const Footer = styled.footer`
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: #96989d;

  :visited {
    color: #96989d;
  }
`;

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Header>
        <h4>Let's chat! GG ✨</h4>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <h4>
          Made with 🤍 by{" "}
          <StyledLink
            href="https://github.com/cristianelias"
            target="_blank"
            rel="noopener"
          >
            Cris
          </StyledLink>
        </h4>
      </Footer>
    </Container>
  );
};
type Props = React.PropsWithChildren<{}>;

export default Layout;
