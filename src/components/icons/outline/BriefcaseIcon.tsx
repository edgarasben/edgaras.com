import * as React from "react";
import type { SVGProps } from "react";
const SvgBriefcaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
    <path fill="none" d="M0 0h256v256H0z" vectorEffect="non-scaling-stroke" />
    <rect
      width={192}
      height={144}
      x={32}
      y={64}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      rx={8}
      vectorEffect="non-scaling-stroke"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M168 64V48a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v16M224 118.31A191.09 191.09 0 0 1 128 144a191.14 191.14 0 0 1-96-25.68M112 112h32"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);
export default SvgBriefcaseIcon;
