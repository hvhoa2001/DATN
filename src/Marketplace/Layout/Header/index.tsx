import { useCommonDataSelector } from "@datn/redux/hook";
import { Box, Container, Theme, Typography } from "@mui/material";
import LogoImg from "/images/logo.png";
import UserWalletProfile from "@datn/common/UserWalletProfile";
import { Link } from "react-router-dom";

export const navConfig = [
  { title: "Colleted", href: "/marketplace/collected" },
  { title: "My Listing", href: "/marketplace/my-listing" },
  { title: "Marketplace", href: "/marketplace" },
];

export default function Header({ headerHeight }: { headerHeight: string }) {
  const { userProfile } = useCommonDataSelector();
  return (
    <Box
      component={"section"}
      sx={{
        height: headerHeight,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          maxWidth: "1560px",
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
                style={{ width: 44, height: "auto" }}
              />
            </Link>
          </Box>
          {navConfig.map((item, index) => (
            <Box key={index} sx={{ flex: 1 }}>
              <Link to={item.href} style={{ textDecoration: "none" }}>
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight={600}
                >
                  {item.title}
                </Typography>
              </Link>
            </Box>
          ))}
          <Box>
            <UserWalletProfile />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
