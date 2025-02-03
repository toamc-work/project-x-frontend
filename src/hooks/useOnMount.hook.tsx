import React, { useEffect, useRef } from "react";

export const useOnMount = (effectCallback: React.EffectCallback) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return effectCallback(); // React will handle the cleanup if a function is returned
    }
  }, []);
};
