import {
  alpha,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Theme,
} from "@mui/material";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import LogoImg from "public/images/nike-logo.png";

function NavMenu() {}

export default function Header({ headerHeight }: { headerHeight: string }) {
  const [hide, setHide] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef<number>(
    typeof window !== "undefined" ? window.scrollY : -1
  );
  const [isTop, setIsTop] = useState(false);

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
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <Link
            href={"/"}
            sx={(theme: Theme) => ({
              img: {
                width: 124,
                height: "auto",
                [theme.breakpoints.down("md")]: {
                  width: 107,
                },
              },
            })}
          >
            <img
              src={LogoImg}
              alt="nike-logo"
              style={{ width: 58, height: "auto" }}
            />
          </Link>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Stack
              component={"nav"}
              flexGrow={1}
              direction={"row"}
              spacing={4}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Button
                href={"https://app.thornprotocol.com/"}
                target="_blank"
                rel="nofollow"
                variant="contained"
                color="primary"
                size="large"
              >
                Launch App
              </Button>
            </Stack>
          </Box>
          <Box sx={{ display: { md: "none", xs: "block" } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                href={"https://app.thornprotocol.com/"}
                target="_blank"
                rel="nofollow"
                variant="contained"
                color="primary"
                size="large"
              >
                Launch App
              </Button>
              {/* <MobileNav /> */}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
