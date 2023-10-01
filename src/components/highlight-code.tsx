"use client";
import { cn } from "@/lib/utils";
import { Inconsolata } from "next/font/google";
import { getHighlighter } from "shiki";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const highlighter = await getHighlighter({
  theme: "dark-plus",
  langs: ["javascript", "html"],
});

export default function HighightCode({ code }: { code: string }) {
  const tokens = highlighter.codeToHtml(code, { lang: "html" });
  return (
    <div
      className={cn(inconsolata.className, "w-full rounded-xl overflow-hidden")}
      dangerouslySetInnerHTML={{ __html: tokens }}>
      {/* <CopyToClipboard
        text={this.state.value}
        onCopy={() => this.setState({ copied: true })}>
        <button>Copy to clipboard with button</button>
      </CopyToClipboard> */}
    </div>
  );
}
