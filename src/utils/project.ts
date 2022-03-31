import { Project } from "pages/project-list/list";
import { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const request = useHttp();

  // const { run, ...result } = useAsync<Project[]>();
  return useQuery<Project[]>(["projects", param], () =>
    request("projects", { data: cleanObject(param || {}) })
  );

  // const fetchPorjects = useCallback(
  //   () => request("projects", { data: cleanObject(param || {}) }),
  //   [param, request]
  // );

  // useEffect(() => {
  //   run(fetchPorjects(), { retry: fetchPorjects });
  // }, [fetchPorjects, param, run]);

  // useEffect(() => {
  //   run(request("projects", { data: cleanObject(param || {}) }));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [param]);

  // return result;
};

export const useEditProject = () => {
  const client = useHttp();

  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) => {
      return client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();

  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
