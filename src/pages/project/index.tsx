import EpicPage from "pages/epic";
import KanbanPage from "pages/kanban";
import { Link, Route, Routes } from "react-router-dom";

const ProjectPage = () => {
  return (
    <div>
      <h1>Project</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path="kanban" element={<KanbanPage />} />
        <Route path="epic" element={<EpicPage />} />
      </Routes>
    </div>
  );
};

export default ProjectPage;
