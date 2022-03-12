import styled from "@emotion/styled";
import { Helmet } from "react-helmet";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListPage } from "pages/project-list";
import { Dropdown, Menu, Button } from "antd";
// import Logo from "assets/software-logo.svg";
import { ReactComponent as Logo } from "assets/software-logo.svg";
import { useDocumentTitle } from "utils";
export const AuthenticateApp = () => {
  const { logout, user } = useAuth();
  // const value: any = undefined;

  useDocumentTitle("项目列表");
  return (
    <Container>
      <Helmet>
        <title>项目列表</title>
      </Helmet>
      {/* <div>{value.isError}</div> */}
      <Header between={true} as={"header"}>
        <HeaderLeft gap={true}>
          {/* <img src={Logo} /> */}
          <Logo width={"18rem"} color={"rgb(38,132,255)"} />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          {/* <button onClick={logout}>登出</button> */}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Button type="link" onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="link">Hi {user?.name}</Button>
          </Dropdown>
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
  padding: 3.2rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
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
