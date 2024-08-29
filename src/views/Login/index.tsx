import { Paper, Typography } from "@mui/material";

export default function () {
    return (
            <Paper sx={{ maxWidth: "480px", bgcolor: "background.paper", p: 3 }}>
                <Typography variant="h4">Login</Typography>
            </Paper>
    )
}