import {
  RTProductDetail,
  RTProducts,
  RTVariantDetail,
} from "@datn/api/services/product-api";
// import useAuctionData, {
//   AuctionDetail,
// } from "@datn/hooks/useAuctionData/useAuctionData";
import useNFTData, {
  ListProductNFT,
  NFTs,
  Product,
} from "@datn/hooks/useNFTData/useNFTData";
import { useTokenId } from "@datn/hooks/useProductId";
import { useProductSelector } from "@datn/redux/hook";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
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
  // auctionList: AuctionDetail[] | null;
  // auctionDetail: AuctionDetail | null;
  ownedNFTsData: NFTs[] | null;
  // NFTsDataDetail: NFTs | null;
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
  // const [NFTsDataDetail, setNFTsDataDetail] = useState<NFTs | null>(null);
  // const [auctionDetail, setAuctionDetail] = useState<AuctionDetail | null>(
  //   null
  // );
  const [sizeId, setSizeId] = useState<string>("");
  const selectedVariant = variantDetail.data;
  const productData = productDetail.data;
  const commonData = product.data;
  const tokenId = useTokenId();

  const { groupedProduct, listProduct, ownedNFTs } = useNFTData();
  const NFTData = groupedProduct;
  const listNFTData = listProduct;
  const ownedNFTsData = ownedNFTs;

  // const { auctions } = useAuctionData();
  // const auctionList = auctions;

  // useEffect(() => {
  //   if (auctionList && tokenId) {
  //     const auctionDetailData =
  //       auctionList.find((nft) => nft.tokenId === Number(tokenId)) || null;
  //     setAuctionDetail(auctionDetailData);
  //   }
  // }, [auctionList, tokenId]);
  // useEffect(() => {
  //   if (ownedNFTsData && tokenId) {
  //     const nftDetail =
  //       ownedNFTsData.find((nft) => nft.id === Number(tokenId)) || null;
  //     setNFTsDataDetail(nftDetail);
  //   }
  // }, [ownedNFTsData, tokenId]);

  const contextValue: ProductContextType = useMemo(() => {
    return {
      // auctionDetail,
      // auctionList,
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
      ownedNFTsData,
      // NFTsDataDetail,
    };
  }, [
    // auctionDetail,
    // auctionList,
    commonData,
    productData,
    NFTData,
    sizeId,
    listNFTData,
    ownedNFTsData,
    selectedSize,
    selectedVariantIndex,
    selectedVariant,
    // NFTsDataDetail,
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
