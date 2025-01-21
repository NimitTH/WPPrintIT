"use client";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { HeroUIProvider } from "@heroui/react"
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push} >
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
        <SpeedInsights />
      </NextThemesProvider>
    </HeroUIProvider>
  )
}