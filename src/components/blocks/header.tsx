"use client";

import useHasMounted from "@/lib/hooks/use-has-mounted";
import { motion } from "framer-motion";
import {
  ChevronRightCircle,
  Menu,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";

type Tab = {
  id: number;
  label: string;
  href: string;
  matcher: (currentPathname: string) => boolean;
};

//Define your header links

let tabs = [
  {
    id: 0,
    label: "Home",
    href: "/",
    matcher: (currentPathanme: string) => {
      return currentPathanme == "/";
    },
  },
  {
    id: 2,
    label: "Pricing",
    href: "/#pricing",
    matcher: function (currentPathanme: string): boolean {
      return false;
    },
  },
  {
    id: 3,
    label: "Blog",
    href: "/blog",
    matcher: function (currentPathanme: string): boolean {
      return currentPathanme.includes("/blog");
    },
  },
] as Tab[];

export function Header() {
  const [menu, setMenu] = useState(false);
  const mounted = useHasMounted();

  let [activeTab, setActiveTab] = useState(tabs[0].id);
  const pathname = usePathname();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  function toggleMenu() {
    setMenu(!menu);
    console.log("mobile nav menu", menu);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center w-full h-16">
        <nav className="relative w-full px-4 m-auto max-w-7xl">
          <div className="flex items-center gap-8">
            <div className="rounded-lg">
              <Link href={"/"} className="z-10 ">
                <Image alt="Logo" src="/logo.svg" className="w-10 h-10 rounded-full" />
              </Link>
            </div>

            <div className="items-center hidden gap-4 sm:flex ">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`${
                    tab.matcher("" + pathname) ? "" : "dark:hover:text-white/60"
                  } relative px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {tab.matcher("" + pathname) && (
                    <motion.span
                      layoutId="bubble"
                      className="absolute inset-0 z-10 dark:bg-white/20 mix-blend-difference "
                      style={{ borderRadius: 9999 }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {tab.label}
                </Link>
              ))}
            </div>
            <div className="relative flex items-center gap-4 ml-auto">
              {mounted && (
                <Toggle
                  onClick={() =>
                    theme == "dark" ? setTheme("light") : setTheme("dark")
                  }
                >
                  {theme == "light" ? <Sun size={16} /> : <Moon size={16} />}
                </Toggle>
              )}
              <Link href={"/auth"}>
                <Button
                  className="gap-2 rounded-full"
                  variant="ghost"
                  size="sm"
                >
                  Sign in or sign up
                  <ChevronRightCircle size={16} />
                </Button>
              </Link>
              <button
                className=" sm:hidden flex z-[100]"
                onClick={() => toggleMenu()}
              >
                <Menu size={32} className="shrink-0" />
              </button>
            </div>
          </div>
        </nav>
      </div>
      {menu && (
        <div className="absolute dark:bg-black border  dark:border-zinc-900 border-zinc-300 rounded-md z-[1000] top-20 right-5">
          <div className="flex flex-col gap-2 p-4">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                href={tab.href}
                className={`${
                  pathname === tab.href ? "" : "dark:hover:text-white/60"
                } relative px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {pathname === tab.href && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-10 dark:bg-white/20 bg-black/10 mix-blend-difference "
                    style={{ borderRadius: 9999 }}
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
