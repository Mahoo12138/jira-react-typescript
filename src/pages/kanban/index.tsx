import styled from "@emotion/styled";
import { Spin } from "antd";
import { PageContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import { KanBanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
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
        </ColumnContainer>
      )}
    </PageContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  /* overflow-x: scroll; */
  flex: 1;
`;

export default KanbanPage;
