import BigNumber from "bignumber.js";
import { readContract, writeContract } from "@wagmi/core";
import { wagmiConfig } from "@datn/wagmi/config";
import { useCallback } from "react";
import NFTShopABI from "@datn/web3/ABI/NFTShop.json";

const shopNFTsABI = [...NFTShopABI.abi] as const;

export default function useNFTsShopContract({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const getListingCounter = useCallback(async () => {
    return (await readContract(wagmiConfig, {
      chainId: 11155111,
      address: contractAddress as `0x${string}`,
      abi: shopNFTsABI,
      functionName: "listingCounter",
    })) as number;
  }, [wagmiConfig, contractAddress]);

  const getListings = useCallback(
    async (tokenId: number) => {
      return (await readContract(wagmiConfig, {
        chainId: 11155111,
        address: contractAddress as `0x${string}`,
        abi: shopNFTsABI,
        functionName: "listings",
        args: [tokenId],
      })) as [string, BigNumber, string, BigNumber, boolean];
    },
    [wagmiConfig, contractAddress]
  );

  const buyNFT = useCallback(
    async (listingId: number) => {
      return await writeContract(wagmiConfig, {
        chainId: 11155111,
        address: contractAddress as `0x${string}`,
        abi: shopNFTsABI,
        functionName: "buyNFT",
        args: [listingId],
      });
    },
    [wagmiConfig, contractAddress]
  );

  return { getListingCounter, getListings, buyNFT };
}
