import { useMemo } from "react";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

export const useProjectQueryParam = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ), // 0 => undefined
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate, editingProjectId }, setProjectParam] =
    useUrlQueryParam(["projectCreate", "editingProjectId"]);

  const { data: editingProject, isLoading } = useProject(+editingProjectId);

  const open = () => setProjectParam({ projectCreate: true });
  const close = () =>
    setProjectParam({ projectCreate: undefined, editingProjectId: undefined });
  const startEdit = (id: number) => setProjectParam({ editingProjectId: id });

  // 参数较少返回 tupple, 否则返回对象
  // return [
  //   projectCreate === 'true',
  //   open,
  //   close
  // ] as const
  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    isLoading,
    editingProject,
  };
};
