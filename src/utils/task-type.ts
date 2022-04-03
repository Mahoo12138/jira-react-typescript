import { useQuery } from "react-query";
import { TaskType } from "types/task-type";
import { useHttp } from "./http";

export const useTaskTypes = (param?: Partial<TaskType>) => {
  const request = useHttp();
  return useQuery<TaskType[]>(["taskTypes", param], () => request("taskTypes"));
};
