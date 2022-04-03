import { useQuery } from "react-query";
import { Task } from "types/task";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useTasks = (param?: Partial<Task>) => {
  const request = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    request("tasks", { data: cleanObject(param || {}) })
  );
};
