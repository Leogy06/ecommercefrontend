"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { RouterTransitionProvider } from "@/context/RouterTransitionContext";
import dynamic from "next/dynamic";
import React from "react";

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RouterTransitionProvider>
        <div className="flex flex-col h-screen overflow-hidden">
          <Header /> {children}
        </div>
      </RouterTransitionProvider>
    </ThemeProvider>
  );
};

export default Provider;
