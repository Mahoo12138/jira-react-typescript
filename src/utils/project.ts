import { Project } from "pages/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const request = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(request("projects", { param: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
