import { formatTime } from "@datn/utils/format";
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
    <Box mt={4}>
      <Typography variant="body1" fontWeight={600} mb={2}>
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
          {userName} - {formatTime(createdAt / 1000, { date: true })}
        </Typography>
      </Box>
      <Typography variant="body1">{content}</Typography>
    </Box>
  );
}
