import { useAuth } from "context/auth-context";
import React from "react";
import { Input, Form } from "antd";

import { LongButton } from "./index";
import { useAsync } from "utils/use-async";

export const LoginPage = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();

  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      onError(e as Error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名!" }]}
      >
        {/* <label htmlFor="username">用户名</label> */}
        <Input type="text" id={"username"} placeholder="请输入用户名"></Input>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input type="password" id={"password"} placeholder="请输入密码"></Input>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
