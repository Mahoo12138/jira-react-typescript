import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { PageContainer } from "components/lib";
import { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDocumentTitle } from "utils";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { useReorderTask, useTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { KanBanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTaskSearchParams,
  useTasksQueryKey,
} from "./utils";

const KanbanPage = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { data: curProject } = useProjectInUrl();

  const { isLoading: taskLoading } = useTasks(useTaskSearchParams());
  const isLoading = kanbanLoading || taskLoading;

  const onDragEnd = useDropEnd();
  return (
    <DragDropContext
      onDragEnd={(param) => {
        console.log(param);
        onDragEnd(param);
      }}
    >
      <PageContainer>
        <h1>{curProject?.name}-看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" tip={"加载中"} />
        ) : (
          <ColumnContainer>
            <Drop type="COLUMN" direction={"horizontal"} droppableId={"kanban"}>
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kb, index) => (
                  <Drag
                    draggableId={"kanban-" + kb.id}
                    index={index}
                    key={kb.id}
                  >
                    <KanBanColumn kanban={kb}></KanBanColumn>
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnContainer>
        )}
        <TaskModal />
      </PageContainer>
    </DragDropContext>
  );
};

export const useDropEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { data: allTasks = [] } = useTasks(useTaskSearchParams());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      // 任务排序
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        if (fromKanbanId === toKanbanId) {
          return;
        }
        const formTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (formTask?.id === toTask?.id) {
          return;
        }

        reorderTask({
          fromId: formTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [allTasks, kanbans, reorderKanban, reorderTask]
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: overlay;
  flex: 1;

  /*---鼠标点击滚动条显示样式--*/
  :hover {
    ::-webkit-scrollbar {
      height: 8px;
    }
  }
  ::-webkit-scrollbar-thumb:hover {
    border-radius: 4px;
  }
  /*---滚动条大小--*/
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgb(224, 225, 227);
  } /* 滚动条的滑轨背景颜色 */
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  } /* 滑块颜色 */
`;

export default KanbanPage;
