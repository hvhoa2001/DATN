import { BaseContextProps } from "@datn/global.config";
import { Breakpoint } from "@mui/material";
import { ReactNode, createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

type TOptions = {
  maxWidth: Breakpoint;
};
interface ModalContextInterface {
  open: boolean;
  title: ReactNode;
  content: ReactNode;
  closeModal: () => void;
  openModal: (
    title: ReactNode,
    content: ReactNode,
    op?: TOptions,
    openNoCondition?: boolean,
    checkConnectedBSC?: boolean,
    checkConnectedOraichain?: boolean
  ) => void;
  options: TOptions;
}

const ModalContext = createContext({ open: false } as ModalContextInterface);

export function ModalProvider({ children }: BaseContextProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<ReactNode>("");
  const [content, setContent] = useState<ReactNode>(<></>);
  const [options, setOptions] = useState<TOptions>({ maxWidth: "xsm" });

  const closeModal = () => {
    setOptions((prev) => {
      return { ...prev, maxWidth: "xsm" };
    });
    setOpen(false);
  };
  const openModal = (
    title: ReactNode,
    content: ReactNode,
    op?: TOptions,
    openNoCondition?: boolean
  ) => {
    if (!openNoCondition) {
      toast.error;
      return;
    }

    setTitle(title);
    setContent(content);
    setOptions((prev) => {
      return { ...prev, ...op };
    });

    setOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{ open, title, content, closeModal, openModal, options }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
