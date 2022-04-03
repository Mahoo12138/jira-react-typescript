import { useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

/**
 * @description 返回当前 url 中的项目 id
 */
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};
/**
 * @description 获取当前 url 中 id 的项目
 * @returns
 */
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

/**
 * @description 返回当前 url 中的项目的 id
 */
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

/**
 * @description 返回查询看板数据的 querykey
 */
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

/**
 * @description 返回当前 url 中的项目的 id
 */
export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: +param.typeId || undefined,
      processorId: +param.processorId || undefined,
      tagId: +param.tagId || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};
/**
 * @description 返回查询看板数据的 querykey
 */
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
