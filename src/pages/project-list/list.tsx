import {
  Button,
  Dropdown,
  Menu,
  message,
  Modal,
  Table,
  TableProps,
} from "antd";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useDeleteProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectQueryKey } from "./utils";

export interface Project {
  id: number;
  // id: string;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
export interface User {
  id: number;
  name: string;
  token: string;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  // refresh: () => void;
}

const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      rowKey={"id"}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                // onCheckedChange={(pin) => mutate({ id: project.id, pin })}
                // 柯里化
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "项目",
          // dataIndex: "name",
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },

        {
          title: "负责人",
          dataIndex: "personId",
          render: (value, project) => {
            return (
              <span>
                {users.find((user) => user.id === Number(project.personId))
                  ?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          dataIndex: "created",
          sorter: (a, b) => a.created - b.created,
          render: (value, project) => {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "未知"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      pagination={false}
      {...props}
    ></Table>
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: delProject } = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (dProject: Project) => {
    Modal.confirm({
      title: `确认要删除项目 ${dProject.name} 吗？`,
      content: "点击确认删除",
      okText: "删除",
      // okCancel: "取消",
      onOk() {
        delProject(dProject);
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(project)}
            key={"delete"}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

export default List;
