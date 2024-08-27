import "@fontsource/red-hat-display";
import { createTheme } from "@mui/material";

const style = "Red Hat Display, Arial, sans-serif";

export const primaryFont = createTheme({
  typography: {
    fontFamily: style,
  },
});
