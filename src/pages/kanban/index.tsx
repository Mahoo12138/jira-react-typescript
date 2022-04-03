import styled from "@emotion/styled";
import { Spin } from "antd";
import { PageContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { KanBanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTaskSearchParams,
} from "./utils";

const KanbanPage = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { data: curProject } = useProjectInUrl();

  const { isLoading: taskLoading } = useTasks(useTaskSearchParams());
  const isLoading = kanbanLoading || taskLoading;

  return (
    <PageContainer>
      <h1>{curProject?.name}-看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size="large" tip={"加载中"} />
      ) : (
        <ColumnContainer>
          {kanbans?.map((kb) => (
            <KanBanColumn kanban={kb} key={kb.id}></KanBanColumn>
          ))}
          <CreateKanban />
        </ColumnContainer>
      )}
      <TaskModal />
    </PageContainer>
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
