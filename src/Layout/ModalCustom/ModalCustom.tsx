import { useModalContext } from "@datn/context/Modal";
import { ClearRounded } from "@mui/icons-material";
import { Dialog, DialogTitle, Typography } from "@mui/material";

export default function ModalCustom() {
  const { open, closeModal, content, title, options } = useModalContext();
  function closeDialog() {
    closeModal();
  }

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      fullWidth
      scroll="paper"
      maxWidth={options?.maxWidth || "xsm"}
      sx={(theme) => ({
        [theme.breakpoints.down("xsm")]: {
          "& .MuiPaper-root": {
            maxWidth: "100%!important",
            margin: "0!important",
            width: "calc(100% - 16px)",
          },
        },
      })}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1.5,
          alignItems: "center",
          px: { xs: 2, xsm: 4.5 },
        }}
      >
        <Typography variant="subtitle1" color={"text.primary"}>
          {title}
        </Typography>
        <ClearRounded
          onClick={closeDialog}
          sx={{
            color: (theme) => {
              return theme.palette.mode == "dark" ? "#4CADD3" : "#595F5A";
            },
            fontSize: "30px",
            cursor: "pointer",
          }}
        />
      </DialogTitle>
      {content}
    </Dialog>
  );
}
