import { useMemo } from "react";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

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

export const useProjectQueryKey = () => {
  const [param] = useProjectQueryParam();
  return ["projects", param];
};

export const useProjectModal = () => {
  const [{ projectCreate, editingProjectId } /*setProjectParam*/] =
    useUrlQueryParam(["projectCreate", "editingProjectId"]);

  const setProjectParam = useSetUrlSearchParam();

  const { data: editingProject, isLoading } = useProject(+editingProjectId);

  const open = () => setProjectParam({ projectCreate: true });
  const close = () =>
    setProjectParam({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) => setProjectParam({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    isLoading,
    editingProject,
  };
};
