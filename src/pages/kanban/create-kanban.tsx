import { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { useKanbansQueryKey, useProjectIdInUrl } from "./utils";
import { Input } from "antd";
import { KanbanContainer } from "./kanban-column";

export const CreateKanban = () => {
  const [name, setName] = useState("");

  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());

  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <KanbanContainer>
      <Input
        size="large"
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      ></Input>
    </KanbanContainer>
  );
};
