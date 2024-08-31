import { LoadingButton } from "@mui/lab";
import { Paper, SxProps, TextField, Theme, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { useLoginContext } from "./context";

const registerInputStyle: SxProps<Theme> | undefined = {
  mb: 1,
};

export default function LoginEmail() {
  const { handleSetHelperText, helperText, setHelperText, email, setEmail } =
    useLoginContext();
  const [loading, setLoading] = useState<boolean>(false);
  const handleCheckEmail = (e: any) => {
    if (
      !e.target.value
        ?.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      handleSetHelperText("email", "Invalid email address");
      return false;
    } else {
      handleSetHelperText("email", "");
      return true;
    }
  };

  const handleCheckData1 = (): boolean => {
    setHelperText({});
    let valid = true;
    if (!email) {
      handleSetHelperText("email", "Email is required");
      valid = false;
    }
    // if (email.startsWith("@") || !email.includes("@") || email.includes(" ")) {
    if (
      !email
        ?.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      handleSetHelperText("email", "Invalid email address");
      valid = false;
    }
    return valid;
  };
  const handleNextStep = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleCheckData1()) {
      return;
    }
    try {
      setLoading(true);
      //   let isValid = true;
      //   const userEmailCheck = await checkEmail(email);
      //   if (!userEmailCheck.valid) {
      //     handleSetHelperText("email", userEmailCheck.message);
      //     isValid = false;
      //   }
      //   if (isValid) {
      //     setStep((prev) => prev + 1);
      //   }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Paper
      sx={{
        maxWidth: "480px",
        bgcolor: "background.paper",
        p: 4,
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Enter your email to join us or sign in.
      </Typography>
      <form
        onSubmit={handleNextStep}
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <TextField
          error={helperText.email ? true : false}
          fullWidth
          label="Email Address *"
          variant="outlined"
          onChange={(e) => {
            handleCheckEmail(e);
            setEmail(e.target.value);
          }}
          type="text"
          value={email}
          helperText={helperText.email || " "}
          sx={registerInputStyle}
        />
        <LoadingButton
          loading={loading}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            maxWidth: "120px",
            borderRadius: "20px",
          }}
        >
          Confirm
        </LoadingButton>
      </form>
    </Paper>
  );
}
