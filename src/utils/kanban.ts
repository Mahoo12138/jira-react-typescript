import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useKanbans = (param?: Partial<Kanban>) => {
  const request = useHttp();
  return useQuery<Kanban[]>(["kanbans", param], () =>
    request("kanbans", { data: cleanObject(param || {}) })
  );
};
