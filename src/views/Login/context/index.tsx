import { StateStatus } from "@datn/common/component";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type HelperText = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  code?: string;
  birthday?: string;
  // organizationName?: string;
  // organizationType?: string;
  userPurpose?: string;
};

export type LoginContextType = {
  isLoggedIn: boolean | undefined;
  status: StateStatus;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  helperText: HelperText;
  setHelperText: Dispatch<SetStateAction<HelperText>>;
  handleBack: () => void;
  checkAuthState: () => Promise<void>;
  handleClickShowPassword: () => void;
  handleSetHelperText: (field: keyof HelperText, value: string) => void;
};

export const LoginContext = createContext<LoginContextType>(
  {} as LoginContextType
);

export default function LoginContextProvider({ children }: PropsWithChildren) {
  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [helperText, setHelperText] = useState<HelperText>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [status, setStatus] = useState<StateStatus>("IDLE");

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((e) => !e);
  }, [setShowPassword]);

  const handleBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, [setStep]);

  const handleSetHelperText = useCallback(
    (field: keyof HelperText, value: string) => {
      setHelperText((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setHelperText]
  );

  const checkAuthState = useCallback(async () => {
    try {
      //pass
    } catch (e) {
      throw e;
    }
  }, []);

  const contextValue: LoginContextType = useMemo(() => {
    return {
      isLoggedIn,
      status,
      step,
      setStep,
      email,
      setEmail,
      showPassword,
      setShowPassword,
      helperText,
      setHelperText,
      checkAuthState,
      handleBack,
      handleSetHelperText,
      handleClickShowPassword,
    };
  }, [
    isLoggedIn,
    status,
    step,
    setStep,
    showPassword,
    setShowPassword,
    email,
    setEmail,
    helperText,
    setHelperText,
    checkAuthState,
    handleBack,
    handleSetHelperText,
    handleClickShowPassword,
  ]);
  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLoginContext = () => useContext(LoginContext);
