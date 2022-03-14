import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

/**
 * @description 返回页面URL中指定键的值
 * @param keys
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("useUrlQueryParam");
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      setSearchParams(o);
    },
  ] as const;
};
