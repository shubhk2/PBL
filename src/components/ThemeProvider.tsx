"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
}

export default function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
}: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute={attribute} defaultTheme={defaultTheme}>
      {children}
    </NextThemesProvider>
  );
}
