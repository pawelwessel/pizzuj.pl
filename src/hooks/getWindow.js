import { useEffect, useState } from 'react';

export function useWindow() {
  const [isWindowDefined, setIsWindowDefined] = useState(false);

  useEffect(() => {
    setIsWindowDefined(typeof window !== 'undefined');
  }, []);

  return isWindowDefined;
}
