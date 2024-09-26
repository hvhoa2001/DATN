import { RTProductDetail } from "@datn/api/services/product-api";
import { useProductSelector } from "@datn/redux/hook";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type Variants = {
  color: string;
  preview: string;
  image: Array<string>;
  sizes: {
    size: number;
    price: number;
    stockQuantity: number;
  }[];
};

export type ProductContextType = {
  selectedVariantIndex: number;
  setSelectedVariantIndex: Dispatch<SetStateAction<number>>;
  selectedSize: number | null;
  setSelectedSize: Dispatch<SetStateAction<number | null>>;
  selectedVariant: Variants | undefined;
  commonData: RTProductDetail | undefined;
};

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export default function ProductContextProvider({
  children,
}: PropsWithChildren) {
  const { data } = useProductSelector().productDetail;
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const commonData = data;
  const selectedVariant = data?.variants?.[selectedVariantIndex];

  const contextValue: ProductContextType = useMemo(() => {
    return {
      selectedVariantIndex,
      setSelectedVariantIndex,
      selectedSize,
      setSelectedSize,
      selectedVariant,
      commonData,
    };
  }, [
    selectedSize,
    selectedVariantIndex,
    selectedVariant,
    commonData,
    setSelectedSize,
    setSelectedVariantIndex,
  ]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => {
  return useContext(ProductContext);
};
