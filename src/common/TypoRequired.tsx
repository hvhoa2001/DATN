import { Typography } from "@mui/material";

export default function TypoRequired({ title }: { title: string }) {
  return (
    <Typography variant="body1" mb={2}>
      {title}{" "}
      <Typography variant="body1" sx={{ color: "red" }} component="span">
        *
      </Typography>
    </Typography>
  );
}
