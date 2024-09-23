import { Box, Rating, Typography } from "@mui/material";

type Props = {
  title: string;
  userName: string;
  createdAt: number;
  content: string;
  rating: number;
};

export default function ReviewItem({
  title,
  userName,
  createdAt,
  content,
  rating,
}: Props) {
  return (
    <Box>
      <Typography variant="body1" fontSize={600} mb={2}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Rating name="reviews" value={rating} readOnly />
        <Typography variant="body1">
          {userName} - {createdAt}
        </Typography>
      </Box>
      <Typography variant="body1">{content}</Typography>
    </Box>
  );
}
