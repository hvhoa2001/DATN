import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Rating,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  rating: number;
  numberOfRating: number;
};

export default function Reviews({ rating, numberOfRating }: Props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h4">Review ({numberOfRating})</Typography>
          <Rating value={rating} readOnly precision={0.01} size="medium" />
        </Box>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
}
