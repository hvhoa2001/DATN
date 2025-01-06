import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jwt = params.get("jwt");
    const role = params.get("role");

    if (jwt && role) {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("role", role);
      navigate("/");
    } else {
      console.error("Error: Missing JWT or role");
      navigate("/login-failed");
    }
  }, [location, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome!</h2>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
