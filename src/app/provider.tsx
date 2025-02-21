"use client"

import { HeroUIProvider } from "@heroui/react"
import {ToastProvider} from "@heroui/toast";
import { ThemeProvider as NextThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
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
  )
}