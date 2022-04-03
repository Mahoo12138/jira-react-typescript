import React, { ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "types/user";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useQueryClient } from "react-query";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    run,
    error,
    isIdel,
    isError,
    isLoading,
    data: user,
    setData: setUser,
  } = useAsync<User | null>();
  const queryClient = useQueryClient();
  const login = (form: AuthForm) => auth.login(form).then((u) => setUser(u));
  const register = (form: AuthForm) => auth.register(form).then(setUser); // point free
  const logout = () =>
    auth.logout().then(() => {
      queryClient.clear(); //  清除本地缓存数据
      setUser(null);
    });

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdel || isLoading) {
    // 展示加载的 loading 界面
    return <FullPageLoading />;
  }
  if (isError) {
    // 展示一个全局的错误信息页面
    return <FullPageErrorFallback error={error} />;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }
  return context;
};
