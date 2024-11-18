import { useCommonDataSelector } from "@datn/redux/hook";
import { formatAddress } from "@datn/utils/format";
import { Avatar, Box, Container, Typography } from "@mui/material";

export default function Profile() {
  const { userProfile } = useCommonDataSelector();
  return (
    <Box component={"section"}>
      <Container
        sx={{
          minHeight: "100vh",
          py: 10,
        }}
      >
        <Box sx={{ display: "flex", gap: 4 }}>
          <Avatar sx={{ width: "168px", height: "168px" }} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" mb={1}>
              {userProfile.data?.userName}
            </Typography>
            <Typography>
              {formatAddress(userProfile.data?.address || "")}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
