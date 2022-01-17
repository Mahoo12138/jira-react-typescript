import { useState } from "react";
import { LoginPage } from "./login";
import { RegisterPage } from "./register";

export const UnAuthenticateApp = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      {isLogin ? <RegisterPage /> : <LoginPage />}
      <button onClick={(e) => setIsLogin(!isLogin)}>切换</button>
    </div>
  );
};
