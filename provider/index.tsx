"use client";

import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { RouterTransitionProvider } from "@/context/RouterTransitionContext";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RouterTransitionProvider>
        <div className="flex flex-col min-h-screen">
          <Header /> {children}
        </div>
      </RouterTransitionProvider>
    </ThemeProvider>
  );
};

export default Provider;
