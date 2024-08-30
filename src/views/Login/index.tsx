import Providers from "@datn/context/Providers";
import {
  Box,
  Container,
  Paper,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";

type HelperText = {
  userName?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  organizationName?: string;
  organizationType?: string;
  userPurpose?: string;
};

const registerInputStyle: SxProps<Theme> | undefined = {
  mb: 1,
};

export default function () {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<HelperText>({});

  const handleSetHelperText = (field: keyof HelperText, value: string) => {
    setHelperText((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
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
  const handleBack = () => {
    setStep((prev) => prev - 1);
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
    // if (!userName) {
    //   handleSetHelperText("userName", "Username cannot be empty");
    //   valid = false;
    // }
    // if (!password) {
    //   handleSetHelperText("password", "Password cannot be empty");
    //   valid = false;
    // }
    // if (!passwordConfirmed) {
    //   handleSetHelperText("passwordConfirm", "Password cannot be empty");
    //   valid = false;
    // }
    // if (password.length < 8) {
    //   handleSetHelperText("password", "Password need at least 8 character");
    //   valid = false;
    // }
    // //check password
    // if (password !== passwordConfirmed) {
    //   handleSetHelperText("passwordConfirm", "Passwords do not match");
    //   valid = false;
    // }
    return valid;
  };
  const handleNextStep = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleCheckData1()) {
      return;
    }
    try {
      setLoading(true);
      let isValid = true;
      //   const userEmailCheck = await checkEmail(email);
      //   if (!userEmailCheck.valid) {
      //     handleSetHelperText("email", userEmailCheck.message);
      //     isValid = false;
      //   }
      if (isValid) {
        setStep((prev) => prev + 1);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Providers>
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
    </Providers>
  );
}
