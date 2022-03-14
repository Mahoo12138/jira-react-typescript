/* @jsxImportSource @emotion/react */
import React from "react";
import { Input, Select, Form } from "antd";

import { Project, User } from "./list";
import { UserSelect } from "components/user-select";

interface SearchPanelProps {
  param: Partial<Pick<Project, "name" | "personId">>;
  users: User[];
  setParam: (param: SearchPanelProps["param"]) => void;
}
const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem", ">*": "" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          placeholder="项目名称"
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        ></Input>
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
          defaultOptionName={"负责人"}
        />
      </Form.Item>
    </Form>
  );
};
export default SearchPanel;
