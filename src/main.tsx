import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import RouterUrl from "./routes.tsx";
import Providers from "./context/Providers.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import AuthContextProvider from "./context/AuthContext/index.tsx";
import ModalCustom from "./Layout/ModalCustom/ModalCustom.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers>
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <RouterUrl />
        </BrowserRouter>
        <ModalCustom />
      </AuthContextProvider>
    </Provider>
  </Providers>
);
