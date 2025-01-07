import useNFTsAuctionContract from "@datn/web3/hooks/useNFTsAuctionContract";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import useNFTData from "../useNFTData/useNFTData";

export type AuctionDetail = {
  seller: string;
  minPrice: number;
  maxPrice: number;
  startTime: number;
  endTime: number;
  tokenId: number;
  nftContract: string;
  highBidder: string;
  highestBid: number;
  image: string;
  description: string;
  size: number;
  name: string;
};

export default function useAuctionData() {
  const { auctionCount, getAuction } = useNFTsAuctionContract({
    contractAddress: "0xad650614Ee4967324e3A95E4223d40ce52BD2B6C",
  });
  const { nfts } = useNFTData();
  const [auctions, setAuctions] = useState<AuctionDetail[]>([]);

  const crawlAuction = async () => {
    try {
      const auctionC = await auctionCount();

      const totalAuctions = new BigNumber(auctionC).toNumber();

      if (totalAuctions <= 0) {
        console.warn("No auctions available.");
        return;
      }

      const indexArray = Array.from({ length: totalAuctions }, (_, i) => i);

      const fetchedAuctions = await Promise.all(
        indexArray.map(async (i) => {
          try {
            const auction = await getAuction(i);
            if (auction[10] === false) {
              const auctionDetail = {
                seller: auction[0],
                nftContract: auction[1],
                tokenId: new BigNumber(auction[2]).toNumber(),
                minPrice: new BigNumber(auction[4])
                  .div(new BigNumber(10).pow(6))
                  .toNumber(),
                maxPrice: new BigNumber(auction[5])
                  .div(new BigNumber(10).pow(6))
                  .toNumber(),
                startTime: new BigNumber(auction[6]).toNumber(),
                endTime: new BigNumber(auction[7]).toNumber(),
                highBidder: auction[8],
                highestBid: new BigNumber(auction[9])
                  .div(new BigNumber(10).pow(6))
                  .toNumber(),
                image: "",
                description: "",
                size: 0,
                name: "",
              };

              if (auctionDetail.endTime > Date.now() / 1000) {
                return auctionDetail;
              }
            }
            return null;
          } catch (error) {
            console.error(`Error fetching auction ${i}:`, error);
            return null;
          }
        })
      );

      const validAuctions = fetchedAuctions.filter(
        (auction): auction is AuctionDetail => auction !== null
      );

      const enrichedAuctions = validAuctions.map((auction) => {
        const matchingNFT = nfts.find((nft) => nft.id === auction.tokenId);
        if (matchingNFT) {
          return {
            ...auction,
            image: matchingNFT.image,
            description: matchingNFT.description,
            size: matchingNFT.size,
            name: matchingNFT.name,
          };
        }
        console.warn("No matching NFT found for tokenId:", auction.tokenId);
        return auction;
      });

      setAuctions((prev) => [
        ...prev,
        ...enrichedAuctions.filter(
          (auction) =>
            !prev.some((existing) => existing.tokenId === auction.tokenId)
        ),
      ]);
    } catch (error) {
      console.error("Failed to crawl auctions:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (nfts.length > 0) {
      crawlAuction();
    }
  }, [nfts]);
  return {
    auctions,
  };
}
