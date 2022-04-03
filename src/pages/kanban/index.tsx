import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanBanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";

const KanbanPage = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: curProject } = useProjectInUrl();

  return (
    <div>
      <h1>{curProject?.name}-看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbans?.map((kb) => (
          <KanBanColumn kanban={kb} key={kb.id}></KanBanColumn>
        ))}
      </ColumnContainer>
    </div>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

export default KanbanPage;
