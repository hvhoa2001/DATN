import { Box, Dialog, Typography } from "@mui/material";

export default function CreateReview() {
  return (
    <Box>
      <Typography
        variant="body1"
        fontWeight={600}
        sx={{ textDecoration: "underline", cursor: "pointer" }}
      >
        Write a Review
      </Typography>
    </Box>
  );
}
