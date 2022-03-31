import styled from "@emotion/styled";
import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectQueryParam } from "./utils";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";

export const ProjectListPage = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle("项目列表", false);
  // const [keys] = useState<("name" | "personId")[]>(["name","personId"])
  const [param, setParam] = useProjectQueryParam();
  const { isLoading, error, data /*retry*/ } = useProjects(
    useDebounce(param, 300)
  );
  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      {/* <Button onClick={retry}>Retry</Button> */}
      <SearchPanel param={param} setParam={setParam} users={users || []} />

      {/* {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null} */}
      <ErrorBox error={error} />
      <List
        // refresh={retry}
        loading={isLoading}
        dataSource={data || []}
        users={users || []}
        // projectButton={props.projectButton}
      />
    </Container>
  );
};

// ProjectListPage.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
