import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { EdgarasDotMatrixInteractive } from "./edgaras-dot-matrix-interactive";

export async function EdgarasDotMatrix() {
  const svgPath = path.join(process.cwd(), "public", "edgaras.svg");
  const rawSvgMarkup = await readFile(svgPath, "utf8");
  const svgMarkup = rawSvgMarkup.replaceAll(
    'fill="black"',
    'fill="white" fill-opacity="0.03"',
  );

  return (
    <EdgarasDotMatrixInteractive>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted local SVG asset */}
      <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
    </EdgarasDotMatrixInteractive>
  );
}
