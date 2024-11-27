import { useCommonDataSelector } from "@datn/redux/hook";
import { Box, Container, Theme } from "@mui/material";
import { Link } from "react-router-dom";
import LogoImg from "/images/nike-logo.png";
import UserWalletProfile from "@datn/common/UserWalletProfile";

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
                style={{ width: 58, height: "auto" }}
              />
            </Link>
          </Box>
          <Box>
            <UserWalletProfile />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
