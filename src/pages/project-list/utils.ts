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
