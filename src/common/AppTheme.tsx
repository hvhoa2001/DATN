import { getThemeConfig, getThemedComponent } from "@datn/theme/theme";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import { PropsWithChildren, useMemo } from "react";

export default function AppTheme({ children }: PropsWithChildren) {
  const theme = useMemo(() => {
    const _theme = responsiveFontSizes(createTheme(getThemeConfig()), {
      breakpoints: ["sm", "md", "lg"],
      factor: 1.2,
      variants: ["h1", "h2", "h3", "body1", "body2"],
    });
    return deepmerge(_theme, getThemedComponent(_theme));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
