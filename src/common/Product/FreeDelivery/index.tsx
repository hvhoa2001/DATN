import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FreeDelivery() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h4">Free Delivery and Returns</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">
          Your order of 200$ or more gets free standard delivery.
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body2">
              Standard delivered 4-5 Business Days
            </Typography>
            <Typography variant="body2">
              Express delivered 2-4 Business Days
            </Typography>
          </ListItem>
        </List>
        <Typography variant="body1">
          Orders are processed and delivered Monday-Friday (excluding public
          holidays)
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
