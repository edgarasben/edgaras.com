import * as React from "react";
import type { SVGProps } from "react";
const SvgClipboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="clipboard-icon_svg__w-6 clipboard-icon_svg__h-6"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.5 3A1.5 1.5 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678q.745.063 1.486.15c1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93q.74-.086 1.487-.15Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgClipboardIcon;
