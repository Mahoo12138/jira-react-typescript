import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  // console.log("useMount start")
  useEffect(() => {
    callback();
    // TODO: 与 useMEmo 有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("useMount over")
};

export const useDebounce = <V>(value: V, delay: number) => {
  // console.log("useDebounce start", value)
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // console.log("debounce Effect start")
    const timeout = setTimeout(() => {
      // console.log("setDebouncedValue")
      setDebouncedValue(value);
    }, delay);
    // console.log("debounce Effect over")
    return () => {
      // console.log("clearTimeout")
      clearTimeout(timeout);
    };
  }, [value, delay]);
  // console.log("useDebounce over")
  return debouncedValue;
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // const oldTitle = document.title;
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnmount]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * @description 返回包含组件挂载状态的 ref
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
