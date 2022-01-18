import React from "react";
import { Input, Select } from "antd";

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
    <div>
      <Input
        type="text"
        value={param.name}
        onChange={(e) => setParam({ ...param, name: e.target.value })}
      ></Input>
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
    </div>
  );
};
export default SearchPanel;
