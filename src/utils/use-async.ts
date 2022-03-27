import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

// 抽象
const useSafeDispatch = <T>(dispacth: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispacth(...args) : void 0),
    [mountedRef, dispacth]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispacth] = useReducer(
    (currentState: State<D>, action: Partial<State<D>>) => ({
      ...currentState,
      ...action,
    }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  const safeDispatch = useSafeDispatch(dispacth);
  const [retry, setRetry] = useState(() => () => {
    console.log("初始化的 retry");
  });

  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        data,
        stat: "success",
        error: null,
      });
    },
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        error,
        data: null,
        stat: "error",
      });
    },
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("需要传入 Promise 类型参数");
      }
      console.log("run 运行 promise");
      setRetry(() => {
        console.log("setretry 存储新的promise ");
        return () => {
          console.log(promise);
          console.log("retry 运行");
          if (runConfig?.retry) {
            run(runConfig.retry(), runConfig);
          }
        };
      });
      safeDispatch({ stat: "loading" });
      return promise
        .then((data) => {
          console.log("set 数据，页面更新");
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          // catch 会捕获异常，不会续传
          // return error;
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, safeDispatch, setData, setError]
  );

  return {
    isIdel: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};

// 自定义 Hook 返回函数
