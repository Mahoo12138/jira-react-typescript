import EpicPage from "pages/epic";
import KanbanPage from "pages/kanban";
import { Link, Navigate, Route, Routes } from "react-router-dom";

const ProjectPage = () => {
  return (
    <div>
      {/* <h1>Project</h1> */}
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
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
      {/* <Navigate to={window.location.pathname + "/kanban"} replace={true}/>  默认路由 */}
    </div>
  );
};

export default ProjectPage;
