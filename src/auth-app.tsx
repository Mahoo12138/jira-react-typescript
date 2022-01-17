import { useAuth } from "context/auth-context";
import { ProjectListPage } from "pages/project-list";

export const AuthenticateApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListPage />
    </div>
  );
};
