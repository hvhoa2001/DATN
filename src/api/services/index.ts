import { deleteAPI, getAPI, postAPI } from "../fetchFunction";

// Authentication ************************************************
type LoginReturnType = {
  success: boolean;
  jwt: string;
  role: string;
};

export async function Login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginReturnType> {
  return await postAPI<LoginReturnType>(
    "http://localhost:3003/auth/login",
    { email: email, password: password },
    {}
  );
}

type LoginParams = {
  address: string;
  nonce: number;
  signature: string;
};

export async function LoginWallet({
  address,
  nonce,
  signature,
}: LoginParams): Promise<LoginReturnType> {
  return await postAPI<LoginReturnType>(
    "http://localhost:3003/auth/login-wallet",
    { address: address, nonce: nonce, signature: signature },
    {}
  );
}

export async function GoogleLogin() {
  return await getAPI("http://localhost:3003/auth/google-login", {});
}

export async function GoogleCallback() {
  return await getAPI<LoginReturnType>(
    "http://localhost:3003/auth/google/callback",
    {}
  );
}

export type TRegister = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type RTRegister = {
  success: boolean;
};

export async function RegisterAccount({
  email,
  password,
  firstName,
  lastName,
}: TRegister): Promise<RTRegister> {
  return await postAPI<RTRegister>(
    "http://localhost:3003/auth/register",
    {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    },
    {}
  );
}

export type RTUserProfile = {
  userId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  avatar?: string;
  cover?: string;
};

export async function fetchUserProfile(userId: string) {
  return await getAPI<RTUserProfile>(
    `http://localhost:3003/user/profile/${userId}`,
    {}
  );
}

type VerifyTokenReturnType = {
  valid: boolean;
};
export async function verifyToken(): Promise<VerifyTokenReturnType> {
  return await getAPI<VerifyTokenReturnType>(
    "http://localhost:3003/auth/verifyToken",
    {}
  );
}

export type RTUserName = {
  userName: string;
  userId: string;
  userEmail: string;
};

export async function fetchUserName() {
  return await getAPI<RTUserName>("http://localhost:3003/user/getUsername", {});
}

export type RTCheckData = {
  valid: boolean;
  message: string;
};

export async function checkEmail({ email }: { email: string }) {
  return await getAPI<RTCheckData>(
    `http://localhost:3003/auth/checkEmail?email=${email}`,
    {}
  );
}

//Favorites ****************************************************************

export type RTFavorites = {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: number;
}[];

export async function featFavorites() {
  return await getAPI<RTFavorites>(
    "http://localhost:3003/favorite/getAllFavorite",
    {}
  );
}

export type TNewFavorite = {
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: number;
};

export type RTNewFavorite = {
  favoriteId: string;
  productId: string;
  name: string;
  price: number;
  size?: number;
};

export async function createFavorite({
  productId,
  name,
  price,
  image,
  size,
}: TNewFavorite): Promise<RTNewFavorite> {
  return await postAPI<RTNewFavorite>(
    "http://localhost:3003/favorite/new-favorite",
    {
      productId: productId,
      name: name,
      price: price,
      image: image,
      size: size,
    },
    {}
  );
}

export type RTDeleteFavorite = {
  success: boolean;
  message: string;
};

export async function deleteFavorite(
  productId: string
): Promise<RTDeleteFavorite> {
  return await deleteAPI<RTDeleteFavorite>(
    `http://localhost:3003/favorite/delete-favorite-item?productId=${productId}`,
    {}
  );
}

// Reviews ****************************************************************
export type RTReviewList = {
  productId: string;
  numberOfReviews: number;
  ratingAverage: number;
  review: {
    userId: string;
    author: string;
    title: string;
    comment: string;
    rating: number;
    createdAt: number;
  }[];
};

export async function fetchReviewList(productId: string) {
  return await getAPI<RTReviewList>(
    `http://localhost:3003/reviews/get-review-list?productId=${productId}`,
    {}
  );
}

export type TNewReview = {
  rating: number;
  title: string;
  comment: string;
};

export type RTNewReview = {
  productId: string;
  title: string;
  comment: string;
  rating: number;
};

export async function createReview({
  productId,
  title,
  comment,
  rating,
}: RTNewReview): Promise<TNewReview> {
  return await postAPI<RTNewReview>(
    `http://localhost:3003/reviews/new-review`,
    {
      productId: productId,
      rating: rating,
      title: title,
      comment: comment,
    },
    {}
  );
}

// Cart ************************************************
export type TCartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: number;
};

export type RTCartItem = {
  productId: string;
  name: string;
  quantity: number;
  size: number;
};

export async function createCartItem({
  productId,
  name,
  price,
  quantity,
  image,
  size,
}: TCartItem) {
  return await postAPI<RTCartItem>(
    "http://localhost:3003/cart/new-cart-item",
    {
      productId: productId,
      name: name,
      price: price,
      quantity: quantity,
      image: image,
      size: size,
    },
    {}
  );
}

export type RTCartItems = {
  productId: string;
  variantId: string;
  sizeId: string;
  name: string;
  price: number;
  color: string;
  image: string;
  size: number;
  quantity: number;
}[];

export async function fetchCartItems() {
  return await getAPI<RTCartItems>(
    "http://localhost:3003/cart/get-cart-items",
    {}
  );
}

export async function fetchCheckoutItems() {
  return await getAPI<RTCartItems>("http://localhost:3003/cart/checkout", {});
}

export type RTCartPrice = {
  subTotal: number;
  fee: number;
  total: number;
};

export async function fetchCartPrice() {
  return await getAPI<RTCartPrice>("http://localhost:3003/cart/cart-price", {});
}

export type RTDeleteCartItem = {
  success: boolean;
  message: string;
};

export async function deleteCartItem(
  productId: string
): Promise<RTDeleteCartItem> {
  return await deleteAPI<RTDeleteCartItem>(
    `http://localhost:3003/cart/delete-cart-item?productId=${productId}`,
    {}
  );
}

export async function checkQuantity({
  variantId,
  sizeId,
}: {
  variantId: string;
  sizeId: string;
}) {
  return await getAPI<RTCheckData>(
    `http://localhost:3003/cart/check-quantity?variantId=${variantId}&sizeId=${sizeId}`,
    {}
  );
}

// Orders ****************************************************************
type StatusOrder = "In process" | "Delivered" | "Completed" | "Cancelled";
type PaymentMethod = "NFTs" | "Credit Card";
export type TOrder = {
  userName: string;
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
};

export type RTOrder = {
  orderId: string;
  userName: string;
  orderDate: number;
  totalAmount: number;
  status: StatusOrder;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
};

export async function createOrder({
  userName,
  totalAmount,
  shippingAddress,
  paymentMethod,
}: TOrder): Promise<RTOrder> {
  return await postAPI<RTOrder>(
    "http://localhost:3003/order/create-order",
    {
      userName: userName,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    },
    {}
  );
}

export type RTImageUpload = {
  cid: string;
};

export async function uploadImage({
  file,
}: {
  file: File | undefined;
}): Promise<RTImageUpload> {
  const formData = new FormData();
  if (file) {
    formData.append("file", file);
  }
  return await postAPI<RTImageUpload>(
    "http://localhost:3003/pinata/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export type RTCheckoutNFT = {
  tokenId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: number;
};

export async function checkoutNFT({
  name,
  size,
}: {
  name: string;
  size: number;
}) {
  return await getAPI<RTCheckoutNFT>(
    `http://localhost:3003/cart/nft-checkout?name=${name}&size=${size}`,
    {}
  );
}
