import { useAuth } from "context/auth-context";
import React from "react";
import { Input, Form } from "antd";

import { LongButton } from "./index";

export const RegisterPage = () => {
  const { register, user } = useAuth();

  return (
    <Form onFinish={register}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        {/* <label htmlFor="username">用户名</label> */}
        <Input type="text" id={"username"} placeholder="请输入用户名"></Input>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input type="password" id={"password"} placeholder="请输入密码"></Input>
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
