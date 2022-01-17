import { AuthenticateApp } from "auth-app";
import { useAuth } from "context/auth-context";
import { UnAuthenticateApp } from "pages/unauth-app";
import React from "react";
import "./App.css";
import { ProjectListPage } from "./pages/project-list";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <ProjectListPage /> */}
      {user ? <AuthenticateApp /> : <UnAuthenticateApp />}
    </div>
  );
}

export default App;
