import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  title: "Cart Schedule",
  description: "To help creating a schedule for cart witnessing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head></head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
