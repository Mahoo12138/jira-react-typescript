import { useState, useEffect } from "react";
import qs from "qs";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useDebounce, useMount } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListPage = () => {
  // console.log("component start");
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch(`${apiUrl}/users`).then(async response => {
  //     if(response.ok){
  //       setUsers(await response.json())
  //     }
  //   })
  // }, [])  // 只触发一次
  useMount(() => {
    // console.log("users data start");
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        // console.log("setUsers start");
        setUsers(await response.json());
        // console.log("setUsers over");
      }
    });
    // console.log("users data over");
  });

  const debouncedParam = useDebounce(param, 300);

  useEffect(() => {
    // console.log("project data start");
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        // console.log("setList start");
        setList(await response.json());
        // console.log("setList over");
      }
    });
    // console.log("project data over");
  }, [debouncedParam]);

  // console.log("component over");
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {/* {console.log("dom ")} */}
      <List list={list} users={users} />
    </div>
  );
};
