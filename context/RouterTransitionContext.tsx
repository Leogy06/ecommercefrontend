"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useTransition } from "react";

interface RouterTransitionProps {
  isPending: boolean;
  push: (path: string) => void;
  back: () => void;
  replace: (path: string) => void;
}

const RouterTransitionContext = createContext<RouterTransitionProps>({
  isPending: false,
  push: () => {},
  back: () => {},
  replace: () => {},
});

export const RouterTransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const push = (path: string) => {
    startTransition(() => {
      router.push(path);
    });
  };

  const back = () => {
    startTransition(() => {
      router.back();
    });
  };

  const replace = (path: string) => {
    startTransition(() => {
      router.replace(path);
    });
  };

  return (
    <RouterTransitionContext.Provider
      value={{
        isPending,
        push,
        back,
        replace,
      }}
    >
      {children}
    </RouterTransitionContext.Provider>
  );
};

export const useRouterTransition = () => {
  const context = useContext(RouterTransitionContext);
  if (!context)
    throw new Error(
      "useRouterTransition must be used within a RouterTranstionProvider."
    );
  return context;
};
