// import type { Highlighter, BundledLanguage, BundledTheme } from "shiki";
// import { getHighlighter, renderToHtml, setCDN, setWasm } from "shiki";

// //update the shiki
// let highlighter: Highlighter;
// export async function highlight(code: string, theme: Theme, lang: Lang) {
//   setWasm("/shiki/dist/onigasm.wasm");
//   setCDN("/shiki/");
//   if (!highlighter) {
//     highlighter = await getHighlighter({
//       langs: [lang],
//       theme: theme,
//     });
//   }

//   const tokens = highlighter.codeToThemedTokens(code, lang, theme, {
//     includeExplanation: false,
//   });
//   const html = renderToHtml(tokens, { bg: "inherit" });

//   return html;
// }
