import { AuthenticateApp } from "auth-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
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
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticateApp /> : <UnAuthenticateApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
