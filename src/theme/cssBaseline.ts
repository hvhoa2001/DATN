import { Components } from "@mui/material";
import { primaryFont } from "./fonts";

export const cssBaseline: Components["MuiCssBaseline"] = {
  styleOverrides: {
    "*": {
      WebkitTapHighlightColor: "transparent",
    },
    html: {
      scrollBehavior: "smooth",
    },
    body: primaryFont.typography,

    "input, select, textarea, input::placeholder, textarea::placeholder": {
      fontFamily: "inherit",
    },
    // disable arrow from input number
    // Chrome, Safari, Edge, Opera
    "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    // Firefox
    "input[type=number]": {
      MozAppearance: "textfield",
    },

    // scrollbar
    ".hide-scrollbar::-webkit-scrollbar": {
      display: "none",
    },
    /* Hide scrollbar for IE, Edge and Firefox */
    ".hide-scrollbar": {
      msOverflowStyle: "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,
    },
    ".custom-scrollbar": {
      // firefox
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(124, 124, 124, 0.6) transparent",

      "&:hover": {
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(124, 124, 124, 0.6)",
        },
      },

      // chrome, safari
      "&::-webkit-scrollbar": {
        width: 6,
        height: 6,
        backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: 10,
        backgroundColor: "rgba(124, 124, 124, 0.4)",
        "&:hover": {
          backgroundColor: "rgba(124, 124, 124, 1)",
        },
      },
      "&::-webkit-scrollbar-corner": {
        display: "none",
      },
    },

    ".text-truncate": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    ".text-gradient": {
      background: "linear-gradient(180deg, #FFF 4.55%, #009FDB 103.1%)",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    // wallet modal
    ":root": {
      "--w3m-z-index": "9999 !important",
    },
    ".ledger-ck-modal": {
      ">:first-child, #ModalWrapper": {
        zIndex: 9999,
      },
    },
  },
};
