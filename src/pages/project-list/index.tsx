import styled from "@emotion/styled";
import { Typography } from "antd";
import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce } from "../../utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectQueryParam } from "./utils";

export const ProjectListPage = () => {
  // const [keys] = useState<("name" | "personId")[]>(["name","personId"])
  const [param, setParam] = useProjectQueryParam();
  const { isLoading, error, data } = useProjects(useDebounce(param, 300));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />

      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={data || []} users={users || []} />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
