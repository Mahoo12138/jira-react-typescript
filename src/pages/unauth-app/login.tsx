import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

export const LoginPage = () => {
  const { login, user } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("event", e);
    e.preventDefault();
    console.log("event", e);
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"}></input>
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"}></input>
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
