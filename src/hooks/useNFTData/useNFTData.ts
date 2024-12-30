import useNFTsContract from "@datn/web3/hooks/useNFTsContract";
import useNFTsShopContract from "@datn/web3/hooks/useNFTsShopContract";
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

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: { size: number; quantity: number; active: boolean }[];
};

export type ListProductNFT = {
  data: Product[];
};

export default function useNFTData() {
  const [nfts, setNFTs] = useState<NFTs[]>([]);
  const [listings, setListings] = useState<Size[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [groupedProduct, setGroupedProduct] = useState<Product | null>(null);
  const [listProduct, setListProduct] = useState<ListProductNFT | null>(null);
  const { getNFTs, tokenURI } = useNFTsContract({
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
    const uniqueSizes = new Map<string, boolean>();

    const res: ProductData[] = nfts
      .map((nft) => {
        const size = listings.find((listing) => listing.tokenId === nft.id);

        if (size) {
          const sizeId = `${size.nftContract}#${size.tokenId}`;

          if (uniqueSizes.has(sizeId)) {
            return null;
          }

          uniqueSizes.set(sizeId, true);

          return {
            name: nft.name,
            price: size.price,
            image: nft.image,
            description: nft.description,
            sizes: {
              id: sizeId,
              size: nft.size,
              quantity: 1,
              active: size.active,
            },
          };
        }
        return null;
      })
      .filter((item): item is ProductData => item !== null);

    setProducts(res);
  }, [nfts, listings]);

  useEffect(() => {
    if (products.length > 0) {
      const grouped = products.reduce<Product>(
        (result, product) => {
          const existingSize = result.sizes.find(
            (s) => s.size === product.sizes.size
          );

          if (existingSize) {
            existingSize.quantity += product.sizes.quantity;
          } else {
            result.sizes.push({ ...product.sizes });
          }

          return result;
        },
        {
          id: Date.now().toString(),
          name: products[0].name,
          price: products[0].price,
          image: products[0].image,
          description: products[0].description,
          sizes: [],
        }
      );

      setGroupedProduct(grouped);
    }
  }, [products]);

  useEffect(() => {
    if (groupedProduct) {
      setListProduct({
        data: [groupedProduct],
      });
    }
  }, [groupedProduct]);

  return { groupedProduct, listProduct };
}
