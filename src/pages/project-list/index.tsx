import { useState } from "react";
import styled from "@emotion/styled";
import { Typography } from "antd";
import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce } from "../../utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";

export const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 300);

  const { isLoading, error, data } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  // console.log("component over");
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

const Container = styled.div`
  padding: 3.2rem;
`;
