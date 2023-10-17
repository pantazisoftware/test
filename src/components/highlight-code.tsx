import { highlight } from "@/lib/shiki";

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
