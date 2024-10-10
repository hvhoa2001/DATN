import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  Container,
  Drawer,
  IconButton,
  // Link,
  Paper,
  Stack,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import LogoImg from "/images/nike-logo.png";
import { NavConfigItem, navConfigs } from "@datn/common/navConfig";
import { StyledSub } from "@datn/common/StyleSub";
import { MenuIcon } from "@datn/common/icons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Search from "@datn/common/Search";
import AuthState from "@datn/common/AuthState";
import { Link } from "react-router-dom";

function MobileNav() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <MenuIcon
          fontSize="large"
          color="secondary"
          sx={{ cursor: "pointer" }}
        />
      </IconButton>
      <Drawer
        open={open}
        anchor="right"
        onClose={handleClose}
        // onOpen={handleOpen}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 250,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          },
        }}
      >
        <Box
          py={5}
          px={3}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {navConfigs.map((nav) => (
            <Box key={nav.id}>
              <Accordion>
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: "text.secondary" }} />
                  }
                  sx={(theme) => ({
                    minHeight: "18px",
                    height: "18px",
                    color: "text.secondary",
                    px: 0,
                    "&.MuiAccordionSummary-expandIconWrapper": {
                      mr: 0,
                    },
                    "&.Mui-expanded": {
                      minHeight: 0,
                      color: theme.palette.primary.main,
                      "&.MuiSvgIcon-root": {
                        fill: theme.palette.primary.main,
                      },
                    },
                    "&.MuiButtonBase-root-MuiAccordionSummary-root": {
                      height: "18px",
                      minHeight: "18px",
                    },
                  })}
                >
                  <Typography variant="subtitle2" fontWeight={600}>
                    {nav.title}
                  </Typography>
                </AccordionSummary>
                {nav.subPage.map(
                  (item) =>
                    item.title && (
                      <StyledSub
                        key={item.id}
                        color="text.primary"
                        href={item.href ? item.href : "#"}
                        {...(nav.isExternal
                          ? {
                              target: "_blank",
                              rel: "noreferrer noopener",
                            }
                          : {})}
                      >
                        <AccordionDetails
                          key={item.id}
                          sx={{
                            px: 0,
                            minHeight: "14px",
                            height: "14px",
                            mt: 1.5,
                            mb: 1.5,
                          }}
                        >
                          {item.title}
                        </AccordionDetails>
                      </StyledSub>
                    )
                )}
              </Accordion>
            </Box>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}

function DropDownMenu({ nav }: { nav: NavConfigItem }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        "& .dropdown-css": {
          display: "none",
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
        },
        "&:hover": {
          "& .dropdown-css": {
            display: "block",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          "&:hover:not(.active)": {
            color: theme.palette.text.primary,
          },
          "&.active": {
            color: theme.palette.text.primary,
          },
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",
            fontWeight: 700,
            right: 1,
            "&:hover:not(.active)": {
              color: theme.palette.text.tertiary,
            },
            "&.active": {
              color: theme.palette.text.tertiary,
            },
          }}
        >
          {nav.title}
        </Typography>
      </Box>
      <Box className="dropdown-css">
        <Paper
          sx={{
            mt: 2,
            minWidth: "240px",
            px: 3,
            py: 1,
            maxHeight: "70%",
            boxShadow: "0px 2px 8px 0px rgba(81, 133, 170, 0.29)",
          }}
          className="custom-scrollbar"
        >
          {nav.subPage?.map((item) => (
            <Box key={item.id} sx={{ my: 2 }}>
              {/* <StyledSub
                color="text.primary"
                href={item.href ? item.href : ""}
                {...(item.isExternal
                  ? {
                      target: "_blank",
                      rel: "noreferrer noopener",
                    }
                  : {})}
              >
                {item.title}
              </StyledSub> */}
              <Link
                to={`/products/c/${item.id.replace(/\s+/g, "-")}`}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="body1" color="text.primary">
                  {item.title}
                </Typography>
              </Link>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}

export default function Header({ headerHeight }: { headerHeight: string }) {
  const [hide, setHide] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef<number>(
    typeof window !== "undefined" ? window.scrollY : -1
  );
  const [isTop, setIsTop] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const scrollHandler = () => {
      if (headerRef.current) {
        const isScrollDown = Boolean(window.scrollY - scrollYRef.current > 0);
        scrollYRef.current = window.scrollY;
        if (window.scrollY === 0) {
          setIsTop(true);
        } else {
          setIsTop(false);
        }
        if (isScrollDown && window.scrollY > headerRef.current.clientHeight) {
          setHide(true);
        } else {
          setHide(false);
        }
      }
    };
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    <Box
      ref={headerRef}
      component="header"
      sx={{
        height: headerHeight,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: "1000",
        transition: "top 250ms ease-in-out",
        bgcolor: "transparent",
        "&:not(.top)": {
          bgcolor: (theme: Theme) =>
            alpha(theme.palette.background.default, 0.6),
          backdropFilter: "blur(30px) brightness(1.5) saturate(1.5)",
        },
        "&.hide": {
          top: -70,
        },
      }}
      className={clsx({
        top: isTop,
        hide: hide,
      })}
    >
      <Container
        maxWidth={false}
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          maxWidth: "1600px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={(theme: Theme) => ({
              img: {
                width: 124,
                height: "auto",
                [theme.breakpoints.down("md")]: {
                  width: 107,
                },
              },
              flex: 2,
            })}
          >
            <Link to={"/"}>
              <img
                src={LogoImg}
                alt="nike-logo"
                style={{ width: 58, height: "auto" }}
              />
            </Link>
          </Box>
          <Box sx={{ flex: 6.5 }}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {navConfigs.map((nav) => (
                  <Box key={nav.id} px={3}>
                    <DropDownMenu nav={nav} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: 3.5, display: "flex", alignItems: "center" }}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Stack
                component={"nav"}
                flexGrow={1}
                direction={"row"}
                spacing={1}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <Search />
                <Tooltip title="Favorites">
                  <Link to="/favorite" style={{ textDecoration: "none" }}>
                    <IconButton>
                      <FavoriteBorderOutlinedIcon fontSize="large" />
                    </IconButton>
                  </Link>
                </Tooltip>
                <Link to="/cart">
                  <Tooltip title="Bag Items">
                    <IconButton>
                      <ShoppingBagOutlinedIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Link>
              </Stack>
            </Box>
            <Box sx={{ display: { md: "none", xs: "block" } }}>
              <Stack
                component={"nav"}
                flexGrow={1}
                direction={"row"}
                spacing={1}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <Search />
                <Tooltip title="Bag Items">
                  <IconButton>
                    <ShoppingBagOutlinedIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <MobileNav />
              </Stack>
            </Box>
            <Box>
              <AuthState />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
