import { User } from "pages/project-list/list";
import { useMount } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const request = useHttp();

  const { run, ...result } = useAsync<User[]>();

  useMount(() => {
    run(request("users", {}));
  });

  return result;
};
