import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  // console.log("useMount start")
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("useMount over")
};

export const useDebounce = (value, delay) => {
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
