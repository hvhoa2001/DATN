import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import RouterUrl from "./routes.tsx";
import Providers from "./context/Providers.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import AuthContextProvider from "./context/AuthContext/index.tsx";
import ModalCustom from "./Layout/ModalCustom/ModalCustom.tsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers>
    <Provider store={store}>
      <AuthContextProvider>
        <ToastContainer
          limit={3}
          theme="colored"
          hideProgressBar
          position="top-right"
          autoClose={1500}
          closeButton={false}
          toastStyle={{
            // "--toastify-font-family": primaryFont.style.fontFamily,
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        />
        <BrowserRouter>
          <RouterUrl />
        </BrowserRouter>
        <ModalCustom />
      </AuthContextProvider>
    </Provider>
  </Providers>
);
