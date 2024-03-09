import * as React from "react";
import type { SVGProps } from "react";
const SvgMagnifyingGlassIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="magnifying-glass-icon_svg__w-6 magnifying-glass-icon_svg__h-6"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607"
    />
  </svg>
);
export default SvgMagnifyingGlassIcon;
