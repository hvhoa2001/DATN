import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <TextField
          id="input-with-icon-textfield"
          sx={{
            maxWidth: "168px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon fontSize="large" />
                </IconButton>
              </InputAdornment>
            ),
            sx: { px: 0, borderRadius: "24px" },
          }}
          size="small"
          placeholder="Search"
        />
      </Box>
      <Box sx={{ display: { md: "none", xs: "block" } }}>
        <IconButton>
          <SearchIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
