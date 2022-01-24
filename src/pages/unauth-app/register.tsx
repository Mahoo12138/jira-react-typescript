import { useAuth } from "context/auth-context";
import React from "react";
import { Input, Form } from "antd";

import { LongButton } from "./index";
import { useAsync } from "utils/use-async";

export const RegisterPage = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();

  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("两次密码输入不一致"));
      return;
    }
    try {
      await run(register(values));
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
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请再次输入密码!" }]}
      >
        <Input
          type="password"
          id={"password"}
          placeholder="请再次确认密码"
        ></Input>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
