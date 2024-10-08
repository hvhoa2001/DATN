import { getAPI } from "@datn/api/fetchFunction";

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

export async function featProducts({ name }: { name?: string }) {
  return await getAPI<RTProducts>(
    `http://localhost:3003/product/getAllProducts?name=${name}`,
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
