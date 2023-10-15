import { highlight } from "@/lib/shiki";
import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function HighightCode({ code }: { code: string }) {
  const tokens = await highlight(code, "github-dark", "html");
  return (
    <>
      <div
        className="overflow-hidden bg-gray-900 rounded-xl dark:bg-gray-900"
        dangerouslySetInnerHTML={{ __html: tokens }}
        style={{ fontFamily: "var(--font-mono)" }}
      />
    </>
  );
}
