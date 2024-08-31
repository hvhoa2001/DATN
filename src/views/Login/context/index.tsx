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
  userName?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  organizationName?: string;
  organizationType?: string;
  userPurpose?: string;
};

export type LoginContextType = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  helperText: HelperText;
  setHelperText: Dispatch<SetStateAction<HelperText>>;
  handleBack: () => void;
  handleSetHelperText: (field: keyof HelperText, value: string) => void;
};

export const LoginContext = createContext<LoginContextType>(
  {} as LoginContextType
);

export default function LoginContextProvider({ children }: PropsWithChildren) {
  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [helperText, setHelperText] = useState<HelperText>({});

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

  const contextValue: LoginContextType = useMemo(() => {
    return {
      step,
      setStep,
      email,
      setEmail,
      helperText,
      setHelperText,
      handleBack,
      handleSetHelperText,
    };
  }, [
    step,
    setStep,
    email,
    setEmail,
    helperText,
    setHelperText,
    handleBack,
    handleSetHelperText,
  ]);
  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLoginContext = () => useContext(LoginContext);
