import { useState } from "react";
import { Card, Divider, Button, Typography } from "antd";
import { LoginPage } from "./login";
import { RegisterPage } from "./register";
import styled from "@emotion/styled";

import left from "assets/left.svg";
import logo from "assets/logo.svg";
import right from "assets/right.svg";
// import { Helmet } from "react-helmet";
import { useDocumentTitle } from "utils";
import { ErrorBox } from "components/lib";

export const UnAuthenticateApp = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle("请登录或注册");

  return (
    <Container>
      {/* <Helmet>
        <title>请登录或注册</title>
      </Helmet> */}
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isLogin ? "请注册" : "请登录"}</Title>
        {/* {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null} */}
        <ErrorBox error={error} />
        {isLogin ? (
          <RegisterPage onError={setError} />
        ) : (
          <LoginPage onError={setError} />
        )}
        <Divider />
        <div style={{ textAlign: "center" }}>
          <Button
            type="link"
            onClick={(e) => {
              setIsLogin(!isLogin);
              setError(null);
            }}
          >
            {isLogin ? "已经有帐号了？直接登录" : "还没有帐号了？注册新账号"}
          </Button>
        </div>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  text-align: center;
  color: rgb(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 2.5rem),
    calc(((100vw - 40rem) / 2) - 2.5rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

// note: box-sizing 属性定义了 user agent 应该如何计算一个元素的总宽度和总高度
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  /* text-align: center; */
`;

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;
