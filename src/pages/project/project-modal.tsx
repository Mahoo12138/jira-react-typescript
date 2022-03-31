import { Button, Drawer } from "antd";
import { useProjectModal } from "pages/project-list/utils";
import react from "react";

export const ProjectModal = () => {
  const { projectCreate, close } = useProjectModal();
  return (
    <Drawer onClose={close} visible={projectCreate} width="100%">
      <h1> Project Modal </h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
