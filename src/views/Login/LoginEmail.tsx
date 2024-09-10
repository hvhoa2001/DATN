import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  Paper,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useLoginContext } from "./context";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Login } from "@datn/api/services";
import { setStorageItem } from "@datn/utils/localStorage";
import { useNavigate } from "react-router-dom";

export const registerInputStyle: SxProps<Theme> | undefined = {
  mb: 1,
};

export default function LoginEmail() {
  const {
    handleSetHelperText,
    helperText,
    setHelperText,
    email,
    setEmail,
    setStep,
    handleClickShowPassword,
    showPassword,
  } = useLoginContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = () => {
    setStep((prev) => prev + 1);
  };

  // const handleCheckEmail = (e: any) => {
  //   if (
  //     !e.target.value
  //       ?.toLowerCase()
  //       .match(
  //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //       )
  //   ) {
  //     handleSetHelperText("email", "Invalid email address");
  //     return false;
  //   } else {
  //     handleSetHelperText("email", "");
  //     return true;
  //   }
  // };

  const handleCheckData = (): boolean => {
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
    if (!password) {
      handleSetHelperText("password", "Password cannot be empty");
      valid = false;
    }
    if (password && password.length < 8) {
      handleSetHelperText("password", "Password need at least 8 character");
      valid = false;
    }
    return valid;
  };
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleCheckData()) {
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
      // setStep((prev) => prev + 1);
      //   }
      const res = await Login({ email: email, password: password });
      setStorageItem("jwt", res.jwt);
      setLoading(false);
      navigate("/");
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
        onSubmit={handleLogin}
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <TextField
          error={helperText.email ? true : false}
          fullWidth
          required
          label="Email Address"
          variant="outlined"
          onChange={(e) => {
            // handleCheckEmail(e);
            setEmail(e.target.value);
          }}
          type="text"
          value={email}
          helperText={helperText.email || " "}
          sx={registerInputStyle}
        />
        <TextField
          value={password}
          required
          fullWidth
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          error={helperText.password ? true : false}
          helperText={helperText.password || " "}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            },
          }}
          sx={registerInputStyle}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mb: 1,
          }}
        >
          <Typography>Not have an account?</Typography>
          <Typography onClick={handleRegister} sx={{ cursor: "pointer" }}>
            Register Now
          </Typography>
        </Box>
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
          Login
        </LoadingButton>
      </form>
    </Paper>
  );
}
