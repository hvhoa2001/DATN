import { Image } from "@datn/common/Image";
import useNFTsContract from "@datn/web3/hooks/useNFTsContract";
import useNFTsShopContract from "@datn/web3/hooks/useNFTsShopContract";
import { Box, Button } from "@mui/material";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
export type Size = {
  nftContract: string;
  tokenId: number;
  paymentToken: string;
  price: number;
  active: boolean;
};

export type NFTs = {
  name: string;
  description: string;
  image: string;
  size: number;
  id: number;
};
export type ProductData = {
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: {
    id: string;
    size: number;
    quantity: number;
    active: boolean;
  };
};

export default function Dashboard() {
  const [nfts, setNFTs] = useState<NFTs[]>([]);
  const [listings, setListings] = useState<Size[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  console.log("🚀 ~ Dashboard ~ products:", products);
  const { getNFTs, ownerOf, tokenURI } = useNFTsContract({
    contractAddress: "0x46Af3f262dE8d835EeC5aAFFD9D3408B7035f7E8",
  });

  const { getListingCounter, getListings } = useNFTsShopContract({
    contractAddress: "0x23A0895694a13d5934c7b69D63eD2aaa5a15a754",
  });

  const crawlNFTs = async () => {
    const countNFTs = await getNFTs();
    const indexArray = Array.from(
      Array(new BigNumber(countNFTs).toNumber()).keys()
    );
    const promise = indexArray.map(async (i) => {
      const tURI = await tokenURI(i);
      const metadata = JSON.parse(tURI);
      if (metadata.size !== undefined) {
        return {
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          size: metadata.size,
          id: metadata.id,
        };
      }
    });

    const result = await Promise.all(promise);
    setNFTs((prevNFTs) => [
      ...prevNFTs,
      ...result.filter((nft) => nft !== undefined),
    ]);
  };

  const crawlListings = async () => {
    const countListings = await getListingCounter();
    const indexArray = Array.from(
      Array(new BigNumber(countListings).toNumber()).keys()
    );
    const promise = indexArray.map(async (i) => {
      const listing = await getListings(i);
      return {
        nftContract: listing[0],
        tokenId: new BigNumber(listing[1]).toNumber(),
        paymentToken: listing[2],
        price: new BigNumber(listing[3])
          .div(new BigNumber(10).pow(6))
          .toNumber(),
        active: Boolean(listing[4]),
      };
    });

    const result = await Promise.all(promise);
    setListings((prevListings) => [...prevListings, ...result]);
  };

  useEffect(() => {
    crawlNFTs();
    crawlListings();
  }, []);

  useEffect(() => {
    const res: ProductData[] = nfts.map((nft) => {
      const size = listings.find((listing) => listing.tokenId === nft.id);
      if (size) {
        return {
          name: nft.name,
          price: size.price,
          image: nft.image,
          description: nft.description,
          sizes: {
            id: `${size.nftContract}#${size.tokenId}`,
            size: nft.size,
            quantity: 1,
            active: size.active,
          },
        };
      }
      return {
        name: nft.name,
        price: 0,
        image: nft.image,
        description: nft.description,
        sizes: {
          id: "",
          size: 0,
          quantity: 0,
          active: false,
        },
      };
    });
    setProducts(res);
  }, [nfts, listings]);

  return (
    <Box sx={{ display: "flex" }}>
      {products.map((product) => {
        console.log("🚀 ~ {products.map ~ products:", product);
        return (
          <Box key={product.sizes.id}>
            <Box>{product.name}</Box>
            <Box>{product.description}</Box>
            <img src={product.image} alt="" style={{ width: "100px" }} />
            <Box>{product.sizes.size}</Box>
            <Box>{product.price}</Box>
            <Box>{product.sizes.active}</Box>
          </Box>
        );
      })}
    </Box>
  );
}
