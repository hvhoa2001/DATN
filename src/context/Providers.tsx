import AppTheme from "@datn/common/AppTheme";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalProvider } from "./Modal";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@datn/wagmi/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppTheme>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            limit={3}
            theme="colored"
            hideProgressBar
            position="top-right"
            autoClose={1000}
          />
          <ModalProvider>{children}</ModalProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </AppTheme>
  );
}
