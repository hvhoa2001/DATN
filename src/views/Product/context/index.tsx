import {
  RTProductDetail,
  RTProducts,
  RTVariantDetail,
} from "@datn/api/services/product-api";
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

export type ProductContextType = {
  selectedVariantIndex: number;
  setSelectedVariantIndex: Dispatch<SetStateAction<number>>;
  selectedSize: number | null;
  setSelectedSize: Dispatch<SetStateAction<number | null>>;
  selectedVariant: RTVariantDetail | undefined;
  productData: RTProductDetail | undefined;
  commonData: RTProducts | undefined;
};

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export default function ProductContextProvider({
  children,
}: PropsWithChildren) {
  const { product, variantDetail, productDetail } = useProductSelector();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const selectedVariant = variantDetail.data;
  const productData = productDetail.data;
  const commonData = product.data;

  const contextValue: ProductContextType = useMemo(() => {
    return {
      commonData,
      productData,
      selectedVariantIndex,
      setSelectedVariantIndex,
      selectedSize,
      setSelectedSize,
      selectedVariant,
    };
  }, [
    commonData,
    productData,
    selectedSize,
    selectedVariantIndex,
    selectedVariant,
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
