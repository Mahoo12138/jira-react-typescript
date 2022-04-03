import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useDebounce } from "utils";
import { useProject } from "utils/project";
import { useTask } from "utils/task";
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
export const useTaskSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  const debouncedName = useDebounce(param.name, 500);
  return useMemo(
    () => ({
      projectId,
      typeId: +param.typeId || undefined,
      processorId: +param.processorId || undefined,
      tagId: +param.tagId || undefined,
      name: debouncedName,
    }),
    [projectId, param, debouncedName]
  );
};
/**
 * @description 返回查询看板数据的 querykey
 */
export const useTasksQueryKey = () => ["tasks", useTaskSearchParams()];

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(+editingTaskId);

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  const close = useCallback(
    () => setEditingTaskId({ editingTaskId: "" }),
    [setEditingTaskId]
  );

  return {
    editingTaskId,
    editingTask,
    startEdit,
    isLoading,
    close,
  };
};
