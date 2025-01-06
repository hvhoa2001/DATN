import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NoData from "@datn/common/Nodata";

export default function OfferTable() {
  return (
    <Accordion sx={{ border: "1px solid #ffffff1f" }}>
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
          <Typography variant="h4">Offer</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <NoData />
      </AccordionDetails>
    </Accordion>
  );
}
