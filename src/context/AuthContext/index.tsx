import { GoogleCallback, Login, verifyToken } from "@datn/api/services";
import { StateStatus } from "@datn/common/component";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type AuthContextType = {
  isLoggedIn: boolean | undefined;
  status: StateStatus;
  checkAuthState: () => void;
  login: (email: string, password: string) => Promise<void>;
  loginGoogle: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [status, setStatus] = useState<StateStatus>("IDLE");

  const checkAuthState = useCallback(async () => {
    try {
      setStatus("PROCESSING");
      const res = await verifyToken();
      if (res.valid) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage?.removeItem("jwt");
        localStorage?.removeItem("role");
      }
      setStatus("SUCCESS");
    } catch (e) {
      setStatus("FAILED");
      setIsLoggedIn(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await Login({
      email: email,
      password: password,
    });
    if (res.success) {
      localStorage.setItem("jwt", res.jwt);
      localStorage.setItem("role", res.role);
      setIsLoggedIn(true);
    }
  }, []);

  const loginGoogle = useCallback(async () => {
    const res = await GoogleCallback();
    if (res.success) {
      localStorage.setItem("jwt", res.jwt);
      localStorage.setItem("role", res.role);
      setIsLoggedIn(true);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  }, []);

  const contextValue: AuthContextType = useMemo(() => {
    return {
      isLoggedIn,
      status,
      login,
      logout,
      checkAuthState,
      loginGoogle,
    };
  }, [isLoggedIn, status, login, logout, checkAuthState, loginGoogle]);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
