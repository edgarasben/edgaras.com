import * as React from "react";
import type { SVGProps } from "react";
const SvgPlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="plus-icon_svg__w-4 plus-icon_svg__h-4"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5z" />
  </svg>
);
export default SvgPlusIcon;
