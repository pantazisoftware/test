import { Provider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "MozoCode - Ultimate UI Library and Ready to use Templates",
  description: "",
  icons: "/logo.svg",
};

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(archivo.className, "dark:bg-black bg-white antialiased")}>
        <Provider>{children}</Provider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
