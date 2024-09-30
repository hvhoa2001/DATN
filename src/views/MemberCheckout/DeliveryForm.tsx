import { useUserEmail } from "@datn/hooks/useUserId";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function DeliveryForm() {
  const userEmail = useUserEmail();
  const [email, setEmail] = useState<string>(userEmail || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  return (
    <Box>
      <Typography variant="h2" mb={8}>
        Delivery
      </Typography>
      <form>
        <Box mb={3}>
          <Typography variant="h4" mb={3}>
            Enter your name and address:
          </Typography>
          <TextField
            value={firstName}
            type="text"
            label="First Name"
            required
            variant="outlined"
            fullWidth
            onChange={(e) => setFirstName(e.target.value)}
            // error={helperText.firstName ? true : false}
            sx={{ mb: 3 }}
            // helperText={helperText.firstName || " "}
          />
          <TextField
            value={lastName}
            type="text"
            label="Last Name"
            required
            variant="outlined"
            fullWidth
            onChange={(e) => setLastName(e.target.value)}
            // error={helperText.lastName ? true : false}
            sx={{ mb: 3 }}
            // helperText={helperText.lastName || " "}
          />
          <TextField
            value={address}
            type="text"
            label="Address or postcode"
            required
            variant="outlined"
            fullWidth
            onChange={(e) => setAddress(e.target.value)}
            // error={helperText.lastName ? true : false}
            sx={{ mb: 3 }}
            // helperText={helperText.lastName || " "}
          />
        </Box>
        <Box>
          <Typography variant="h4" mb={3}>
            What's your contact information
          </Typography>
          <TextField
            // error={helperText.email ? true : false}
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
            sx={{ mb: 3 }}
            // helperText={helperText.email || " "}
            // sx={registerInputStyle}
          />
          <TextField
            value={phone}
            type="text"
            label="Phone Number"
            required
            variant="outlined"
            fullWidth
            onChange={(e) => setPhone(e.target.value)}
            // error={helperText.firstName ? true : false}
            sx={{ mb: 3 }}
            // helperText={helperText.firstName || " "}
          />
        </Box>
      </form>
    </Box>
  );
}
