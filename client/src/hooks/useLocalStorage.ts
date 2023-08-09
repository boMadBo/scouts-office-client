import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getValue = () => {
    const storage = localStorage.getItem(key);
    return storage ? JSON.parse(storage) : initialValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};

export default useLocalStorage;
