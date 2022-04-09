import styled from "@emotion/styled";
import { Menu } from "antd";
import EpicPage from "pages/epic";
import KanbanPage from "pages/kanban";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

const ProjectPage = () => {
  const route = useRouteType();
  return (
    <Container>
      {/* <h1>Project</h1> */}
      <Aside>
        <Menu mode={"inline"} selectedKeys={[route]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path="/kanban" element={<KanbanPage />} />
          {/* <Route index element={<KanbanPage />} /> 默认路由 */}
          <Route path="/epic" element={<EpicPage />} />
          <Route
            path="*"
            element={
              <Navigate replace to={window.location.pathname + "/kanban"} />
            }
          />
        </Routes>
      </Main>
      {/* <Navigate to={window.location.pathname + "/kanban"} replace={true}/>  默认路由 */}
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  overflow: hidden;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;
export default ProjectPage;
