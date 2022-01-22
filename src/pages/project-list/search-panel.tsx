/* @jsxImportSource @emotion/react */
import React from "react";
import { Input, Select, Form } from "antd";

import { User } from "./list";

interface SearchPanelProps {
  param: {
    name: string;
    personId: string;
  };
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
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
export default SearchPanel;
