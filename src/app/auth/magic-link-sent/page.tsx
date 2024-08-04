"use client";

import { GradientBorder } from "@/components/ui/gradient-border";
import { Mail } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col">
      <GradientBorder className="bg-white rounded-full w-fit dark:bg-black">
        <div className="grid w-10 h-10 shrink-0 place-items-center">
          <Mail size={18} />
        </div>
      </GradientBorder>

      <div className="flex flex-col pt-8">
        <p className="text-lg font-medium text-black dark:text-white">
          Magic link sent
        </p>
        <p className="text-zinc-400">
          {"Please check your email for a magic sign-in link."}
        </p>
      </div>
    </div>
  );
}
