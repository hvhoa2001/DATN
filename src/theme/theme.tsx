import { Theme, ThemeOptions, alpha, lighten } from "@mui/material";
import "@fontsource/red-hat-display";
import { primaryFont } from "./fonts";
import { cssBaseline } from "./cssBaseline";

const round = (value: number): number => Math.round(value * 1e5) / 1e5;
const pxToRem = (size: number): string => `${size / 16}rem`;

const buildVariant = (
  fontWeight: number,
  size: number,
  lineHeight: number,
  letterSpacing?: number
) => ({
  fontFamily: "inherit",
  fontWeight,
  fontSize: pxToRem(size),
  lineHeight: `${round(lineHeight / size)}`,
  ...(letterSpacing !== undefined
    ? { letterSpacing: `${round(letterSpacing / size)}em` }
    : {}),
});

export function getThemeConfig(): ThemeOptions {
  return {
    breakpoints: {
      keys: ["xs", "xsm", "sm", "smm", "md", "lg", "xl", "xxl"],
      values: {
        xs: 0,
        xsm: 480,
        sm: 600,
        smm: 840,
        md: 960,
        lg: 1280,
        xl: 1440,
        xxl: 1600,
      },
    },
    palette: {
      mode: "dark",
      background: {
        default: "#000000",
        paper: "#181818",
        paper2: "",
        primary: "#0E1D27",
        secondary: "#172731",
      },
      primary: {
        main: "#8C030E",
      },
      secondary: {
        main: "#70020B",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#D3D5D5",
        tertiary: "#AE212C",
      },
      success: {
        main: "#15C381",
      },
      error: {
        main: "#B92F2F",
      },
      divider: alpha("#009FDB", 0.2),
    },
    typography: {
      h1: buildVariant(700, 44, 54, 0),
      h2: buildVariant(700, 32, 40, 0),
      h3: buildVariant(500, 24, 29, 0),
      h4: buildVariant(500, 20, 27, 0),
      subtitle1: buildVariant(500, 18, 20, 0),
      subtitle2: buildVariant(500, 16, 20, 0),
      body1: buildVariant(400, 16, 19, 0),
      body2: buildVariant(400, 14, 18, 0),
      small: buildVariant(400, 12, 15, 0),
      button: {
        ...buildVariant(600, 14, 18, 0),
        textTransform: "none",
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variant: "body1",
          variantMapping: {
            h1: "h1",
            h2: "h2",
            h3: "h3",
            h4: "h4",
            body1: "p",
            body2: "p",
            subtitle1: "p",
            subtitle2: "p",
            small: "p",
            button: "p",
          },
        },
      },
    },
  };
}

export function getThemedComponent(theme: Theme): ThemeOptions {
  return {
    components: {
      MuiCssBaseline: cssBaseline,

      // link
      MuiLink: {
        defaultProps: {
          underline: "none",
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            height: 1,
            backgroundColor: "#7E7E7E",
          },
        },
      },

      // button
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 10,
            "&.Mui-disabled": {
              cursor: "not-allowed",
              pointerEvents: "auto",
            },
          },
          containedSecondary: {
            backgroundColor: "#12212C",
            color: theme.palette.secondary.main,
            "&:hover:not([disabled])": {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
            },
          },
          sizeMedium: {
            padding: "8px 16px",
          },
          sizeLarge: {
            fontSize: "0.875rem",
            padding: "10px 22px",
          },
        },
      },

      // input
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },

      // tooltip
      MuiTooltip: {
        defaultProps: {
          arrow: true,
          placement: "top",
        },
        styleOverrides: {
          tooltip: {
            fontFamily: primaryFont.typography.fontFamily,
            backgroundColor: "#12212C",
            color: theme.palette.text.secondary,
            filter: "drop-shadow(0px 2px 2px #0000004A)",
            fontSize: theme.typography.small.fontSize,
            padding: "8px 12px",
          },
          arrow: {
            color: "#12212C",
          },
          tooltipPlacementTop: {
            marginBottom: "10px !important",
          },
        },
      },

      // dialog
      MuiDialog: {
        defaultProps: {
          PaperProps: {
            elevation: 0,
          },
        },
        styleOverrides: {
          paper: {
            borderRadius: 10,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontFamily: "inherit",
          },
        },
      },

      // paper
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: "10px",
          },
        },
      },

      // Table
      MuiTableRow: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-root:first-of-type": {
              paddingLeft: "24px",
            },
            "& .MuiTableCell-root:last-of-type": {
              paddingRight: "24px",
            },
            "&.MuiTableRow-hover:hover": {
              backgroundColor: "#12212C",
            },
            overflow: "scroll",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-root": {
              backgroundColor: "#0E1D27",
              color: "#9AA7BA",
            },
            "& .MuiTableCell-root:first-of-type": {
              paddingLeft: "24px",
            },
            "& .MuiTableCell-root:last-of-type": {
              paddingRight: "24px",
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-root": {
              color: "#E2EDFF",
              paddingTop: "20px",
              paddingBottom: "20px",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            border: "none",
            backgroundColor: "transparent",
          },
        },
      },

      // skeleton
      MuiSkeleton: {
        defaultProps: {
          animation: "wave",
        },
      },

      // avatar
      MuiAvatarGroup: {
        styleOverrides: {
          avatar: {
            borderColor: theme.palette.text.secondary,
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            fontFamily: "inherit",
            fontSize: "0.875rem",
          },
          colorDefault: {
            color: theme.palette.text.primary,
          },
        },
      },

      // chip
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: "inherit",
            backgroundColor: "#12212C",
            color: theme.palette.text.tertiary,
            borderRadius: "10px",
            fontWeight: 500,
          },
          clickable: {
            "&:hover": {
              backgroundColor: lighten("#12212C", 0.05),
            },
          },
        },
      },

      // accordion
      MuiAccordion: {
        styleOverrides: {
          root: {
            "&::before": {
              content: "none",
            },
            borderRadius: "10px",
          },
        },
      },

      // svg
      MuiSvgIcon: {
        styleOverrides: {
          fontSizeSmall: {
            fontSize: "1rem",
          },
          fontSizeMedium: {
            fontSize: "1.25rem",
          },
          fontSizeLarge: {
            fontSize: "1.5rem",
          },
        },
      },
    },
  };
}
