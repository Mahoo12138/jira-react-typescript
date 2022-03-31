import { useMemo } from "react";
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
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  // 参数较少返回 tupple, 否则返回对象
  // return [
  //   projectCreate === 'true',
  //   open,
  //   close
  // ] as const
  return {
    projectCreate: projectCreate === "true",
    open,
    close,
  };
};
