import { Table } from "antd";

interface Project {
  id: number;
  name: string;
  personId: number;
}
export interface User {
  id: number;
  name: string;
  token: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

const List = ({ list, users }: ListProps) => {
  return (
    <Table
      dataSource={list}
      columns={[
        {
          title: "项目",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          dataIndex: "personId",
          render: (value, project) => {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      pagination={false}
    ></Table>
  );
};

export default List;
