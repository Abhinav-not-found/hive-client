"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const toasterTheme = theme.theme === "dark" ? "dark" : "light";
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' richColors theme={toasterTheme} />
      {children}
    </QueryClientProvider>
  );
}
