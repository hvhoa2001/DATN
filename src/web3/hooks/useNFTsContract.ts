import { useCallback } from "react";
import { readContract, writeContract } from "@wagmi/core";
import { wagmiConfig } from "@datn/wagmi/config";
import NFT from "@datn/web3/ABI/NFT.json";
import BigNumber from "bignumber.js";

const getNFTsABI = [...NFT.abi] as const;

export default function useNFTsContract({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const getNFTs = useCallback(async () => {
    return (await readContract(wagmiConfig, {
      chainId: 23295,
      address: contractAddress as `0x${string}`,
      abi: getNFTsABI,
      functionName: "getTokenIdCounter",
    })) as number;
  }, [wagmiConfig, contractAddress]);

  const ownerOf = useCallback(
    async (tokenId: number) => {
      return (await readContract(wagmiConfig, {
        chainId: 23295,
        address: contractAddress as `0x${string}`,
        abi: getNFTsABI,
        functionName: "ownerOf",
        args: [tokenId],
      })) as string;
    },
    [wagmiConfig, contractAddress]
  );

  const tokenURI = useCallback(
    async (tokenId: number) => {
      return (await readContract(wagmiConfig, {
        chainId: 23295,
        address: contractAddress as `0x${string}`,
        abi: getNFTsABI,
        functionName: "tokenURI",
        args: [tokenId],
      })) as string;
    },
    [wagmiConfig, contractAddress]
  );

  return { getNFTs, ownerOf, tokenURI };
}
