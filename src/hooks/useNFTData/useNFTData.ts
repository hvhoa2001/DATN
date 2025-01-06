import useNFTsContract from "@datn/web3/hooks/useNFTsContract";
import useNFTsShopContract from "@datn/web3/hooks/useNFTsShopContract";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

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
  owner: string;
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
  const [ownedNFTs, setOwnedNFTs] = useState<NFTs[]>([]);
  const [groupedProduct, setGroupedProduct] = useState<Product | null>(null);
  const [listProduct, setListProduct] = useState<ListProductNFT | null>(null);
  const { address } = useAccount();

  const { getNFTs, tokenURI, ownerOf } = useNFTsContract({
    contractAddress: "0xA5416449768E6f1D2dA8dcE97f66c5FcAEF49B67",
  });

  const { getListingCounter, getListings } = useNFTsShopContract({
    contractAddress: "0x16B79CB03D976767477383c5062835e89d65c55b",
  });

  const crawlNFTs = async () => {
    const countNFTs = await getNFTs();
    const indexArray = Array.from(
      Array(new BigNumber(countNFTs).toNumber()).keys()
    );

    const fetchedNFTs = await Promise.all(
      indexArray.map(async (i) => {
        const tURI = await tokenURI(i);
        const owner = await ownerOf(i);
        console.log("🚀 ~ indexArray.map ~ owner:", owner);

        const metadata = JSON.parse(
          tURI.replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
        );
        console.log("🚀 ~ indexArray.map ~ metadata:", metadata);

        if (metadata.size !== undefined) {
          return {
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            size: metadata.size,
            id: metadata.id - 1,
            owner,
          };
        }
        return null;
      })
    );

    const validNFTs = fetchedNFTs.filter((nft): nft is NFTs => nft !== null);

    // Lưu tất cả các NFT
    setNFTs((prevNFTs) => [
      ...prevNFTs,
      ...validNFTs.filter(
        (nft) => !prevNFTs.some((existingNFT) => existingNFT.id === nft.id)
      ),
    ]);

    setOwnedNFTs((prevOwnedNFTs) => [
      ...prevOwnedNFTs,
      ...validNFTs.filter(
        (nft) =>
          nft.owner === address &&
          !prevOwnedNFTs.some((existingNFT) => existingNFT.id === nft.id)
      ),
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
              id: size.tokenId.toString(),
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
      console.log(1);
    }
  }, [products]);

  useEffect(() => {
    if (groupedProduct) {
      setListProduct({
        data: [groupedProduct],
      });
    }
    console.log(3);
  }, [groupedProduct]);

  return { groupedProduct, listProduct, ownedNFTs, nfts };
}
