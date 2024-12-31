import BigNumber from "bignumber.js";
import { readContract, writeContract } from "@wagmi/core";
import NFTAdminABI from "@datn/web3/ABI/NFTAdmin.json";
import { useCallback } from "react";
import { wagmiConfig } from "@datn/wagmi/config";

const listingABI = [...NFTAdminABI.abi] as const;

export default function useNFTsAdminContract({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const mintNFT = useCallback(
    async (
      price: BigNumber,
      name: string,
      description: string,
      image: string,
      size: number[],
      amount: number[]
    ) => {
      return await writeContract(wagmiConfig, {
        chainId: 11155111,
        address: contractAddress as `0x${string}`,
        abi: listingABI,
        functionName: "createNFTAndListShop",
        args: [name, description, image, size, amount, price.toNumber()],
      });
    },
    [wagmiConfig, contractAddress]
  );
  return { mintNFT };
}
