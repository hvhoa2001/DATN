import { Link, styled } from "@mui/material";

export const StyledSub = styled(Link)(({ theme }) => ({
  fontSize: "14px",
  transition: "color 250ms ease-in",
  fontWeight: 400,
  "&:hover:not(.active)": {
    color: theme.palette.text.tertiary,
    fontWeight: 700,
  },
  "&.active": {
    color: theme.palette.text.tertiary,
  },
}));
