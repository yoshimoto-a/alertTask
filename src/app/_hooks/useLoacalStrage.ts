import { useState, useEffect } from "react";

type Response<T> = [T, (value: T) => void];

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): Response<T> => {
  const [value, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const getValue = (): T => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (e) {
        console.error(e);
        return initialValue;
      }
    };

    setStoredValue(getValue());
  }, [key, initialValue]);

  const setValue = (argValue: T): void => {
    try {
      setStoredValue(argValue);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(argValue));
      }
    } catch (e) {
      console.error(e);
    }
  };
  return [value, setValue];
};
