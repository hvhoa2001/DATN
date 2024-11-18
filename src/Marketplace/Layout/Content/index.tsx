import { Container } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function Content({ headerHeight }: { headerHeight: string }) {
  return (
    <Container sx={{ minHeight: `calc(100svh - ${headerHeight})` }}>
      <Suspense>
        <Outlet />
      </Suspense>
    </Container>
  );
}
