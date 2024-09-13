import { getAPI } from "@datn/api/fetchFunction";

export type RTProducts = {
  productId: string;
  name: string;
  description: string;
  variants: {
    color: string;
    image: Array<string>;
    sizes: {
      size: number;
      price: number;
      stockQuantity: number;
    }[];
  }[];
  status: string;
  price: number;
  highlight: string;
  image: Array<string>;
  category: string;
  createdAt: string;
  updatedAt: string;
}[];

export async function featProducts() {
  return await getAPI<RTProducts>(
    "http://localhost:3003/product/getAllProducts",
    {}
  );
}
