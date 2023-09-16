"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarItem({
    title,
    href,
    icon,
  }: {
    title: string;
    href: string;
    icon: React.ReactNode;
  }) {
    const pathname = usePathname();
    let active = pathname == href;
    let classes =
      "text-sm rounded-md font-display w-full font-display px-4 py-2 flex items-center space-x-3 ";
    if (active) {
      classes += " dark:bg-zinc-900/70 bg-zinc-200/50";
    } else {
      classes += " opacity-50 hover:opacity-100 duration-150";
    }
  
    return (
      <Link href={href} className={classes}>
        {icon}
        <span>{title}</span>
      </Link>
    );
  }
  