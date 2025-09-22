"use client";

import { useTranslations } from "next-intl";
import React, { createContext, useContext } from "react";

interface NotFoundContextType {
  errors: (key: string) => string;
}

const NotFoundContext = createContext<NotFoundContextType | undefined>(
  undefined,
);

export function NotFoundProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations();

  const errors = (key: string) => {
    try {
      return t(key);
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };

  return (
    <NotFoundContext.Provider value={{ errors }}>
      {children}
    </NotFoundContext.Provider>
  );
}

export function useNotFoundContext() {
  const context = useContext(NotFoundContext);
  if (context === undefined) {
    throw new Error(
      "useNotFoundContext must be used within a NotFoundProvider",
    );
  }
  return context;
}
