import { useUserEmail } from "@datn/hooks/useUserId";
import { useCommonDataSelector } from "@datn/redux/hook";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SelectAddress from "./Address";

export default function DeliveryForm() {
  const userEmail = useUserEmail();
  const [email, setEmail] = useState<string>(userEmail || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const { data } = useCommonDataSelector().price;
  const [country, setCountry] = useState<string>("Vietnam");
  const [states, setStates] = useState<string>("Hà Nội");

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
          <SelectAddress
            country={country}
            states={states}
            handleCountryChange={setCountry}
            handleStateChange={setStates}
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
        <Box mb={3}>
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
            sx={{ mb: 10 }}
            // helperText={helperText.firstName || " "}
          />
          <Divider />
        </Box>
        <Box>
          <Typography variant="h2" mb={8}>
            Shipping
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>{`${
            data?.fee == 0 ? "Free Shipping" : "10$ Shipping"
          }`}</Typography>
          <Typography variant="body1" color="text.secondary" mb={1}>
            Shipment One
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Arrives Fri, Oct 4 - Thu, Oct 10
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={3}>
            This is an international shipment requiring customs clearance
          </Typography>
        </Box>
      </form>
    </Box>
  );
}
