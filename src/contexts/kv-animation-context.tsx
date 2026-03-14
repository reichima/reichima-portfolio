"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type KvAnimationContextType = {
  isKvAnimating: boolean;
  setIsKvAnimating: (value: boolean) => void;
};

const KvAnimationContext = createContext<KvAnimationContextType>({
  isKvAnimating: false,
  setIsKvAnimating: () => {},
});

export function KvAnimationProvider({ children }: { children: ReactNode }) {
  const [isKvAnimating, setIsKvAnimating] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isKvAnimating ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isKvAnimating]);

  const value = useMemo(
    () => ({ isKvAnimating, setIsKvAnimating }),
    [isKvAnimating],
  );

  return (
    <KvAnimationContext.Provider value={value}>
      {children}
    </KvAnimationContext.Provider>
  );
}

export function useKvAnimation() {
  return useContext(KvAnimationContext);
}
