'use client'
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import { useEffect } from "react";

export default function Code({ code, language }: { code: string, language:string }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Code">
        <h1>Code deployment</h1>
      <pre>
        <code className={`overflow-hidden whitespace-pre-wrap language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}