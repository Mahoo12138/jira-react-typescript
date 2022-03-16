import { useState } from "react";

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

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const [retry, setRetry] = useState(() => () => {
    console.log("初始化的 retry");
  });

  const setData = (data: D) => {
    setState({
      data,
      stat: "success",
      error: null,
    });
  };

  const setError = (error: Error) => {
    setState({
      error,
      data: null,
      stat: "error",
    });
  };

  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
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
    // const run = (promise: Promise<D>) => {
    //   if (!promise || !promise.then) {
    //     throw new Error("需要传入 Promise 类型参数");
    //   }
    //   console.log("run 运行 promise")
    //   setRetry(()=>{
    //     console.log("setretry 存储新的promise ")
    //     return ()=>{
    //       console.log(promise)
    //       console.log("retry 运行")
    //       run(promise)}
    //   })
    setState({ ...state, stat: "loading" });
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
  };

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
