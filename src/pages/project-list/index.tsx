import { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListPage = () => {
  // console.log("component start");
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const request = useHttp();

  // useEffect(() => {
  //   fetch(`${apiUrl}/users`).then(async response => {
  //     if(response.ok){
  //       setUsers(await response.json())
  //     }
  //   })
  // }, [])  // 只触发一次
  useMount(() => {
    // console.log("users data start");
    request("users", {}).then(setUsers);
    // console.log("users data over");
  });

  const debouncedParam = useDebounce(param, 300);

  useEffect(() => {
    // console.log("project data start");
    request("projects", { param: cleanObject(debouncedParam) }).then(setList);
    // console.log("project data over");
  }, [debouncedParam]);

  // console.log("component over");
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {/* {console.log("dom ")} */}
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
