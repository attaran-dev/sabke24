import { useState, useEffect } from 'react';

const usePersistentContext = (key, defaultValue) => {
  const isBrowser = typeof window !== 'undefined';

  const [state, setState] = useState(() => {
    if (isBrowser) {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, isBrowser]);

  return [state, setState];
};

export default usePersistentContext;