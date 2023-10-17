import { promises as fs } from "fs";
import type { Highlighter, Lang, Theme } from "shiki";
import { getHighlighter, renderToHtml, setCDN, setWasm } from "shiki";

//update the shiki
let highlighter: Highlighter;
export async function highlight(code: string, theme: Theme, lang: Lang) {
  setWasm("/shiki/dist/onigasm.wasm");
  setCDN("/shiki/");
  const mytheme = await fs.readFile(
    process.cwd() +
      "https://raw.githubusercontent.com/shikijs/shiki/main/packages/shiki/themes/dark-plus.json",
    "utf8"
  );
  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: [lang],
      theme: await mytheme,
    });
  }

  const tokens = highlighter.codeToThemedTokens(code, lang, theme, {
    includeExplanation: false,
  });
  const html = renderToHtml(tokens, { bg: "inherit" });

  return html;
}
