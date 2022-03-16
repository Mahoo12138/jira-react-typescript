import { Project } from "pages/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const request = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  const fetchPorjects = () =>
    request("projects", { data: cleanObject(param || {}) });

  useEffect(() => {
    run(fetchPorjects(), { retry: fetchPorjects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  // useEffect(() => {
  //   run(request("projects", { data: cleanObject(param || {}) }));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [param]);

  return result;
};

export const useEditProject = () => {
  const { run, retry, ...asyncResult } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return client(`projects/${params.id}`, {
      method: "PATCH",
      data: params,
    });
  };
  return { mutate, retry, ...asyncResult };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return client(`projects/${params.id}`, {
      method: "POST",
      data: params,
    });
  };
  return { mutate, ...asyncResult };
};
