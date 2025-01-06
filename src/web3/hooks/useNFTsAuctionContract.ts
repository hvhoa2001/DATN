import { wagmiConfig } from "@datn/wagmi/config";
import NFTAuctionABI from "@datn/web3/ABI/NFTAuction.json";
import { readContract, writeContract } from "@wagmi/core";
import BigNumber from "bignumber.js";
import { useCallback } from "react";

const auctionABI = [...NFTAuctionABI.abi];

export default function useNFTsAuctionContract({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const auctionCount = useCallback(async () => {
    return (await readContract(wagmiConfig, {
      chainId: 11155111,
      address: contractAddress as `0x${string}`,
      abi: auctionABI,
      functionName: "auctionCount",
      args: [],
    })) as number;
  }, [wagmiConfig, contractAddress]);

  const createAuction = useCallback(
    async (
      nftAddress: string,
      tokenId: number,
      tokenAddress: string,
      minPrice: BigNumber,
      maxPrice: BigNumber,
      startTime: number,
      endTime: number
    ) => {
      return await writeContract(wagmiConfig, {
        chainId: 11155111,
        address: contractAddress as `0x${string}`,
        abi: auctionABI,
        functionName: "createAuction",
        args: [
          nftAddress,
          tokenId,
          tokenAddress,
          minPrice.toNumber(),
          maxPrice.toNumber(),
          startTime,
          endTime,
        ],
      });
    },
    [wagmiConfig, contractAddress]
  );

  const claimNFT = useCallback(
    async (auctionId: number) => {
      return await writeContract(wagmiConfig, {
        chainId: 11155111,
        address: contractAddress as `0x${string}`,
        abi: auctionABI,
        functionName: "claimNFT",
        args: [auctionId],
      });
    },
    [wagmiConfig, contractAddress]
  );

  const getAuction = useCallback(
    async (auctionId: number) => {
      return (await readContract(wagmiConfig, {
        chainId: 11155111,
        address: contractAddress as `0x${string}`,
        abi: auctionABI,
        functionName: "auctions",
        args: [auctionId],
      })) as [
        string,
        string,
        number,
        string,
        BigNumber,
        BigNumber,
        number,
        number,
        string,
        BigNumber,
        boolean
      ];
    },
    [wagmiConfig, contractAddress]
  );

  return { auctionCount, createAuction, claimNFT, getAuction };
}
