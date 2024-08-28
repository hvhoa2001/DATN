import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

export type SvgIconComponent = React.FC<SvgIconProps>;

// eslint-disable-next-line react/display-name
export const MenuIcon: SvgIconComponent = (props) => {
  return (
    <SvgIcon
      {...props}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 12.9541H21.664"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 5.9541H21.664"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 19.9541H21.664"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
