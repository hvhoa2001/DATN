import { useParams } from "react-router-dom";

export default function useProductId() {
  const { productId } = useParams<{ productId: string }>();
  return productId;
}

export function useTokenId() {
  const { tokenId } = useParams<{ tokenId: string }>();
  return tokenId;
}

export function useAuctionId() {
  const { auctionId } = useParams<{ auctionId: string }>();
  return auctionId;
}
