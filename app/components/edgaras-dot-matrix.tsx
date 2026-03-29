import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { EdgarasDotMatrixInteractive } from "./edgaras-dot-matrix-interactive";

export async function EdgarasDotMatrix() {
  const svgPath = path.join(process.cwd(), "public", "edgaras.svg");
  const svgMarkup = await readFile(svgPath, "utf8");

  return (
    <EdgarasDotMatrixInteractive>
      <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
    </EdgarasDotMatrixInteractive>
  );
}
