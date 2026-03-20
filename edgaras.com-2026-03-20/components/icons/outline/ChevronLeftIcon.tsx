import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="chevron-left-icon_svg__w-6 chevron-left-icon_svg__h-6"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);
export default SvgChevronLeftIcon;
