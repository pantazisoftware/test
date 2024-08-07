import type { BundledLanguage, BundledTheme } from "shiki/bundle/web"; // Import the types from shiki // [!code highlight]
import { codeToHtml } from "shiki/bundle/web";

type Props = {
  code: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
};

export default async function Code({
  code,
  lang = "html",
  theme = "github-dark",
}: Props) {
  const html = await codeToHtml(code, {
    lang,
    theme,
  });

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
