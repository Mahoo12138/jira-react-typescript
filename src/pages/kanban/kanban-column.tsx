import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useKanbansQueryKey, useTaskModal, useTaskSearchParams } from "./utils";

import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./craete-task";
import { Task } from "types/task";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "components/lib";
import React from "react";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((type) => type.id === id)?.name;
  if (!name) {
    return null;
  }
  return (
    <img
      style={{ width: "2rem" }}
      src={name === "task" ? taskIcon : bugIcon}
      alt={name}
    />
  );
};
const Mark = ({ keyword, name }: { name: string; keyword: string }) => {
  if (!keyword) return <>{name}</>;
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey());

  const startDelete = () => {
    Modal.confirm({
      title: "确定要删除该看板吗？",
      content: "点击确认删除",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return deleteKanban({ id: kanban.id });
      },
    });
  };
  const overlay = () => (
    <Menu>
      {/* <Menu.Item key={""}></Menu.Item> */}
      <Menu.Item key={"delete"} onClick={startDelete}>
        删除
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <Button type="link">...</Button>
    </Dropdown>
  );
};
const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTaskSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <Mark keyword={keyword} name={task.name} />
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const KanBanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <KanbanContainer {...props} ref={ref}>
      <Row between={true}>
        <h3>{kanban.name}</h3> <More kanban={kanban} />
      </Row>
      <TasksContainer>
        <Drop type="ROW" droppableId={kanban.id + ""} direction="vertical">
          <DropChild style={{ minHeight: "5px" }}>
            {tasks?.map((task, index) => (
              <Drag draggableId={task.id + ""} index={index} key={task.id}>
                <div>
                  <TaskCard task={task} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </KanbanContainer>
  );
});

export const KanbanContainer = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: #e7ebf3;
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  //TODO: 了解一下，去掉滚动条
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* Firefox */
`;
