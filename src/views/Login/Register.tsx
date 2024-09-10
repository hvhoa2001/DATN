import {
  Box,
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useLoginContext } from "./context";
import { registerInputStyle } from "./LoginEmail";
import { useEffect, useState } from "react";
// import CachedIcon from "@mui/icons-material/Cached";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import { checkEmail, Login, RegisterAccount } from "@datn/api/services";
import { useNavigate } from "react-router-dom";
import { setStorageItem } from "@datn/utils/localStorage";

export default function Register() {
  const {
    handleBack,
    helperText,
    setHelperText,
    handleSetHelperText,
    showPassword,
    handleClickShowPassword,
  } = useLoginContext();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleCheckData = (): boolean => {
    setHelperText({});
    let valid = true;
    // if (!code) {
    //   handleSetHelperText("code", "Code is required");
    //   valid = false;
    // }
    if (!firstName) {
      handleSetHelperText("firstName", "First name is required");
      valid = false;
    }
    if (!lastName) {
      handleSetHelperText("lastName", "Last name is required");
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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleCheckData()) {
      return;
    }
    try {
      setLoading(true);
      let isValid = true;
      const userEmailCheck = await checkEmail({ email: email });
      if (!userEmailCheck.valid) {
        handleSetHelperText("email", userEmailCheck.message);
        isValid = false;
      }
      if (isValid) {
        await RegisterAccount({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        });
        handleBack();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={1}>
        Now let's make you a Nike Member.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Register your new member
        {/* <Typography
          variant="body1"
          component="span"
          onClick={handleBack}
          sx={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Edit
        </Typography> */}
      </Typography>
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <TextField
          error={helperText.email ? true : false}
          fullWidth
          label="Email *"
          variant="outlined"
          onChange={(e) => {
            handleCheckEmail(e);
            setEmail(e.target.value);
          }}
          type="text"
          value={email}
          helperText={helperText.email || " "}
          sx={registerInputStyle}
          // slotProps={{
          //   input: {
          //     endAdornment: (
          //       <CachedIcon sx={{ cursor: "pointer", fontSize: "1.4rem" }} />
          //     ),
          //   },
          // }}
        />
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              value={firstName}
              type="text"
              label="First Name *"
              variant="outlined"
              onChange={(e) => setFirstName(e.target.value)}
              error={helperText.firstName ? true : false}
              sx={registerInputStyle}
              helperText={helperText.firstName || " "}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              value={lastName}
              type="text"
              label="Last Name *"
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
              error={helperText.lastName ? true : false}
              sx={registerInputStyle}
              helperText={helperText.lastName || " "}
            />
          </Grid2>
        </Grid2>
        <TextField
          value={password}
          fullWidth
          label="Password *"
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
        <DatePicker
          disableFuture
          label="Date of Birth*"
          slotProps={{
            textField: {
              error: Boolean(helperText.birthday),
              helperText: helperText.birthday,
              fullWidth: true,
            },
          }}
        />
        <Box sx={{ display: "flex", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{
              width: "120px",
              borderRadius: "20px",
              mr: 1,
            }}
          >
            Back
          </Button>
          <LoadingButton
            loading={loading}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              maxWidth: "144px",
              borderRadius: "20px",
            }}
          >
            Create Account
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
