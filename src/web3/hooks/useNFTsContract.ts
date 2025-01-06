import { useCallback } from "react";
import { readContract, writeContract } from "@wagmi/core";
import { wagmiConfig } from "@datn/wagmi/config";
import NFT from "@datn/web3/ABI/NFT.json";

const getNFTsABI = [...NFT.abi] as const;

export default function useNFTsContract({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const getNFTs = useCallback(async () => {
    return (await readContract(wagmiConfig, {
      chainId: 11155111,
      address: contractAddress as `0x${string}`,
      abi: getNFTsABI,
      functionName: "getTokenIdCounter",
    })) as number;
  }, [wagmiConfig, contractAddress]);

  const ownerOf = useCallback(
    async (tokenId: number) => {
      return (await readContract(wagmiConfig, {
        chainId: 11155111,
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
        chainId: 11155111,
        address: contractAddress as `0x${string}`,
        abi: getNFTsABI,
        functionName: "tokenURI",
        args: [tokenId],
      })) as any;
    },
    [wagmiConfig, contractAddress]
  );

  const approve = useCallback(
    async (address: string, tokenId: number) => {
      return await writeContract(wagmiConfig, {
        chainId: 11155111,
        address: contractAddress as `0x${string}`,
        abi: getNFTsABI,
        functionName: "approve",
        args: [address, tokenId],
      });
    },
    [wagmiConfig, contractAddress]
  );

  return { getNFTs, ownerOf, tokenURI, approve };
}
