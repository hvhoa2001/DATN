import { createReview } from "@datn/api/services";
import TypoRequired from "@datn/common/TypoRequired";
import useProductId from "@datn/hooks/useProductId";
import { useProductSelector } from "@datn/redux/hook";
import { useProductContext } from "@datn/views/Product/context";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";

export default function CreateReview() {
  const [open, setOpen] = useState<boolean>(false);
  const { selectedVariant, productData } = useProductContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Typography
        variant="body1"
        fontWeight={600}
        sx={{ textDecoration: "underline", cursor: "pointer" }}
        onClick={handleOpen}
      >
        Write a Review
      </Typography>
      <Dialog open={open} onClose={handleClose}>
        <Paper
          sx={{
            bgcolor: "background.paper",
            p: 4,
            minWidth: "400px",
            width: "700px",
            overflowX: "auto",
          }}
          className="hide-scrollbar"
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" mb={1}>
              Write a Review
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Share your thoughts with the community.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", mb: 3 }}>
            <img
              src={selectedVariant?.preview || ""}
              style={{
                width: "60px",
                height: "60px",
                marginRight: "12px",
                borderRadius: "4px",
              }}
            />
            <Typography variant="body1">{productData?.name}</Typography>
          </Box>
          <FormReview handleClose={handleClose} />
        </Paper>
      </Dialog>
    </Box>
  );
}

type HelperText = {
  rating?: string;
  title?: string;
  content?: string;
};

function FormReview({ handleClose }: { handleClose: () => void }) {
  const productId = useProductId();
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [helperText, setHelperText] = useState<HelperText>({});

  const handleSetHelperText = useCallback(
    (field: keyof HelperText, value: string) => {
      setHelperText((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setHelperText]
  );

  const handleCheckData = (): boolean => {
    setHelperText({});
    let valid = true;
    if (!rating) {
      handleSetHelperText("rating", "Rating is required");
      valid = false;
    }
    if (!title) {
      handleSetHelperText("title", "Title is required");
      valid = false;
    }
    if (!content) {
      handleSetHelperText("content", "Comment is required");
      valid = false;
    }
    return valid;
  };

  const handleReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleCheckData()) {
      return;
    }
    try {
      setLoading(true);
      await createReview({
        productId: productId || "",
        rating: rating || 0,
        title: title,
        comment: content,
      });
      handleClose();
      setLoading(false);
    } catch (error) {
      handleClose();
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleReview}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box mb={4}>
        <Typography variant="body1">Overall rating</Typography>
        <Rating
          value={rating}
          onChange={(_, newValue) => setRating(newValue || 0)}
          size="large"
          sx={{ my: 2 }}
        />
      </Box>
      <Box mb={4}>
        <TypoRequired title="Your Review" />
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          label="Your Review"
          required
          minRows={4}
          multiline
          fullWidth
          error={helperText.content ? true : false}
          sx={{ mb: 1 }}
          // helperText={helperText.content || " "}
        />
        <Typography variant="small">
          Describe what you liked, what you didn't like and other key things
          shoppers should know. Minimum 30 characters.
        </Typography>
      </Box>
      <Box mb={4}>
        <TypoRequired title="Review title" />
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Review title"
          required
          fullWidth
          error={helperText.title ? true : false}
          sx={{ mb: 1 }}
          // helperText={helperText.content || " "}
        />
        <Typography variant="small">
          Summarize your review in 150 characters or less.
        </Typography>
      </Box>
      <LoadingButton
        loading={loading}
        fullWidth
        variant="contained"
        sx={{ borderRadius: "20px", height: "44px" }}
        type="submit"
      >
        Submit
      </LoadingButton>
    </form>
  );
}
