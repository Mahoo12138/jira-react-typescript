import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanabanConfig,
} from "./use-optimistic-config";

export const useKanbans = (param?: Partial<Kanban>) => {
  const request = useHttp();
  return useQuery<Kanban[]>(["kanbans", param], () =>
    request("kanbans", { data: cleanObject(param || {}) })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  fromId: number;
  type: "before" | "after";
  referenceId: number;
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanabanConfig(queryKey));
};
