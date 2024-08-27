import AppTheme from "@datn/common/AppTheme";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalProvider } from "./Modal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppTheme>
      <ToastContainer
        limit={3}
        theme="colored"
        hideProgressBar
        position="top-right"
        autoClose={1000}
      />
      <ModalProvider>{children}</ModalProvider>
    </AppTheme>
  );
}
