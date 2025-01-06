import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Rating,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CreateReview from "./CreateReview";
import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import useProductId from "@datn/hooks/useProductId";
import { getReviewList } from "@datn/redux/slices/common/fetchFunction";
import { useEffect } from "react";
import ReviewItem from "./ReviewItem";

export default function Reviews() {
  const { data } = useCommonDataSelector().reviews;
  const productId = useProductId();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(getReviewList(productId));
    }
  }, [dispatch, productId]);
  return (
    <>
      {data && (
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
              <Typography variant="h4">
                Review ({data.numberOfReviews})
              </Typography>
              <Rating
                value={data.ratingAverage || 0}
                readOnly
                precision={0.1}
                size="medium"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating
                value={data.ratingAverage || 0}
                readOnly
                precision={0.1}
                size="medium"
              />
              <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>
                {data.ratingAverage || 0} Stars
              </Typography>
            </Box>
            <CreateReview />
            {data.review &&
              data.review.map((item, index) => {
                return (
                  <Box key={index}>
                    <ReviewItem
                      content={item.comment}
                      rating={item.rating || 0}
                      userName={item.author}
                      title={item.title}
                      createdAt={item.createdAt}
                    />
                  </Box>
                );
              })}
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
}
