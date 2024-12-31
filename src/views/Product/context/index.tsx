import {
  RTProductDetail,
  RTProducts,
  RTVariantDetail,
} from "@datn/api/services/product-api";
import useNFTData, {
  ListProductNFT,
  Product,
} from "@datn/hooks/useNFTData/useNFTData";
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
  sizeId: string | undefined;
  setSizeId: Dispatch<SetStateAction<string>>;
  setSelectedSize: Dispatch<SetStateAction<number | null>>;
  selectedVariant: RTVariantDetail | undefined;
  productData: RTProductDetail | undefined;
  commonData: RTProducts | undefined;
  NFTData: Product | null;
  listNFTData: ListProductNFT | null;
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
  const [sizeId, setSizeId] = useState<string>("");
  const selectedVariant = variantDetail.data;
  const productData = productDetail.data;
  const commonData = product.data;

  const { groupedProduct, listProduct } = useNFTData();

  const NFTData = groupedProduct;

  const listNFTData = listProduct;

  const contextValue: ProductContextType = useMemo(() => {
    return {
      sizeId,
      setSizeId,
      commonData,
      productData,
      selectedVariantIndex,
      setSelectedVariantIndex,
      selectedSize,
      setSelectedSize,
      selectedVariant,
      NFTData,
      listNFTData,
    };
  }, [
    commonData,
    productData,
    NFTData,
    sizeId,
    listNFTData,
    selectedSize,
    selectedVariantIndex,
    selectedVariant,
    setSelectedSize,
    setSizeId,
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
