import styled from "@emotion/styled";
// import { Helmet } from "react-helmet";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListPage } from "pages/project-list";
import { Dropdown, Menu, Button } from "antd";
// import Logo from "assets/software-logo.svg";
import { ReactComponent as Logo } from "assets/software-logo.svg";
import { resetRoute } from "utils";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import ProjectPage from "pages/project";
import { ProjectModal } from "pages/project/project-modal";
import { ProjectPopover } from "pages/project/project-popover";
export const AuthenticateApp = () => {
  // const [projectModalOpen, setProjectModalOpen] = useState(false);
  // const value: any = undefined;
  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      {/* <div>{value.isError}</div> */}
      <Router>
        <PageHeader
          projectButton={
            <ButtonNoPadding
              type="link"
              // onClick={() => setProjectModalOpen(true)}
            >
              创建项目
            </ButtonNoPadding>
          }
        />

        {/* <Nav>Nav</Nav> */}
        <Main>
          {/* <ProjectListPage /> */}

          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListPage
                  projectButton={
                    <ButtonNoPadding
                      type="link"
                      // onClick={() => setProjectModalOpen(true)}
                    >
                      编辑
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route path={"/projects/:projectId/*"} element={<ProjectPage />} />
            <Route path="*" element={<Navigate to={"/projects"} />} />
          </Routes>
        </Main>

        <ProjectModal
        // projectModalOpen={projectModalOpen}
        // onClose={() => setProjectModalOpen(false)}
        />
        {/* <Aside>Aside</Aside> */}
        {/* <Footer>footer</Footer> */}
      </Router>
    </Container>
  );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
  const { logout, user } = useAuth();
  return (
    <Header between={true} as={"header"}>
      <HeaderLeft gap={true}>
        {/* <img src={Logo} /> */}
        <Button type="link" onClick={resetRoute} style={{ padding: 0 }}>
          <Logo width={"18rem"} color={"rgb(38,132,255)"} />
        </Button>
        <ProjectPopover />
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
  );
};

const Container = styled.div`
  display: grid;
  /* grid-template-areas: "header header header" "nav main aside" "footer footer footer"; */
  /* grid-template-columns: 20rem 1fr 20rem; */
  grid-template-rows: 6rem 1fr;
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
  display: flex;
  overflow: hidden;
  /* grid-area: main; */
`;
// const Nav = styled.nav`
//   grid-area: nav;
// `;
// const Aside = styled.aside`
//   grid-area: aside;
// `;
// const Footer = styled.footer`
//   /* grid-area: footer; */
// `;
