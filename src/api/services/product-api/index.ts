import { getAPI, postAPI } from "@datn/api/fetchFunction";

export type RTProducts = {
  productId: string;
  name: string;
  description: string;
  status: string;
  category: string;
  createdAt: number;
  updatedAt: number;
  gender: string;
  variants: Array<RTVariantDetail>;
}[];

export async function featProducts({
  name,
  category,
}: {
  name?: string;
  category?: string;
}) {
  return await getAPI<RTProducts>(
    `http://localhost:3003/product/getAllProducts?name=${name}&category=${category}`,
    {}
  );
}

export type RTProductDetail = {
  productId: string;
  name: string;
  description: string;
  status: string;
  category: string;
  gender: string;
  createdAt: number;
  updatedAt: number;
  variants: {
    _id: string;
    productId: string;
    color: string;
    image: Array<string>;
    preview: string;
    madeIn: Array<string>;
    isOnSale: boolean;
    highlight: string;
    style: string;
    fullPrice: number;
    currentPrice: number;
    saleRate: number;
    sizes: {
      _id: string;
      variantId: string;
      size: number;
      stockQuantity: number;
    }[];
  }[];
};

export async function featProductDetail(productId: string) {
  return await getAPI<RTProductDetail>(
    `http://localhost:3003/product/product-detail?productId=${productId}`,
    {}
  );
}

export type RTVariantDetail = {
  variantId: string;
  productId: string;
  sizes: {
    _id: string;
    variantId: string;
    size: number;
    stockQuantity: number;
  }[];
  color: string;
  preview: string;
  image: Array<string>;
  madeIn: Array<string>;
  fullPrice: number;
  currentPrice: number;
  saleRate: number;
  isOnSale: false;
  highlight: string;
  style: string;
  isSoldOut: boolean;
};

export async function featVariantDetail({
  variantId,
  productId,
}: {
  variantId: string;
  productId: string;
}) {
  return await getAPI<RTVariantDetail>(
    `http://localhost:3003/product/variant-detail?variantId=${variantId}&productId=${productId}`,
    {}
  );
}

export type RTProductNFT = {
  productId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: Array<number>;
}[];

export async function featProductNFT() {
  return await getAPI<RTProductNFT>(`http://localhost:3003/nft/get-nft`, {});
}

export type RTDetailNFT = {
  productId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: Array<number>;
};

export async function featProductDetailNFT(name: string) {
  return await getAPI<RTDetailNFT>(
    `http://localhost:3003/nft/get-nft-detail?name=${name}`,
    {}
  );
}

export async function updateProduct(tokenId: number) {
  return await postAPI<RTProductNFT>(
    `http://localhost:3003/nft/update-nft?tokenId=${tokenId}`,
    {
      tokenId: tokenId,
    },
    {}
  );
}
