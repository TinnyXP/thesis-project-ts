"use client"

import { HeroUIProvider } from "@heroui/react"
import {ToastProvider} from "@heroui/toast";
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { SessionProvider} from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
    <HeroUIProvider>
      <NextThemeProvider
        attribute="class"
        defaultTheme="light"
        themes={["light", "dark"]}
      >
        <ToastProvider />
        {children}
      </NextThemeProvider>
    </HeroUIProvider>
    </SessionProvider>
  )
}