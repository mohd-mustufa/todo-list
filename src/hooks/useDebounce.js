import { useEffect, useState } from "react";

const useDebounce = (value, limit) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, limit);

    return () => {
      clearTimeout(timer);
    };
  });

  return debouncedValue;
};

export default useDebounce;
