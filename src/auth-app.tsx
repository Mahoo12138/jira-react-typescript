import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListPage } from "pages/project-list";

export const AuthenticateApp = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Left</h2>
          <h2>Logo</h2>
          <h2>Pros</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      {/* <Nav>Nav</Nav> */}
      <Main>
        <ProjectListPage />
      </Main>
      {/* <Aside>Aside</Aside> */}
      <Footer>footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  /* grid-template-areas: "header header header" "nav main aside" "footer footer footer"; */
  /* grid-template-columns: 20rem 1fr 20rem; */
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(Row)`
  /* grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; */
`;

const HeaderLeft = styled(Row)`
  /* display: flex;
  align-items: center;
  flex-direction: row; */
`;
const HeaderRight = styled.div``;

const Main = styled.main`
  /* grid-area: main; */
`;
// const Nav = styled.nav`
//   grid-area: nav;
// `;
// const Aside = styled.aside`
//   grid-area: aside;
// `;
const Footer = styled.footer`
  /* grid-area: footer; */
`;
