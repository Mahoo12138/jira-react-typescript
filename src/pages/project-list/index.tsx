import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectQueryParam } from "./utils";

export const ProjectListPage = () => {
  useDocumentTitle("项目列表", false);
  // const [keys] = useState<("name" | "personId")[]>(["name","personId"])
  const [param, setParam] = useProjectQueryParam();
  const { isLoading, error, data, retry } = useProjects(
    useDebounce(param, 300)
  );
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      {/* <Button onClick={retry}>Retry</Button> */}
      <SearchPanel param={param} setParam={setParam} users={users || []} />

      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={data || []}
        users={users || []}
      />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
