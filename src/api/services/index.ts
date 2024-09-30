import { deleteAPI, getAPI, postAPI } from "../fetchFunction";

// Authentication ************************************************
type LoginReturnType = {
  success: boolean;
  jwt: string;
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

export type RTCheckEmail = {
  valid: boolean;
  message: string;
};

export async function checkEmail({ email }: { email: string }) {
  return await getAPI<RTCheckEmail>(
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
  color: string;
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
  color?: string;
  size?: number;
};

export type RTNewFavorite = {
  favoriteId: string;
  productId: string;
  name: string;
  price: number;
  color?: string;
  size?: number;
};

export async function createFavorite({
  productId,
  name,
  price,
  image,
  color,
  size,
}: TNewFavorite): Promise<RTNewFavorite> {
  return await postAPI<RTNewFavorite>(
    "http://localhost:3003/favorite/new-favorite",
    {
      productId: productId,
      name: name,
      price: price,
      image: image,
      color: color,
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
  color: string;
  image: string;
  size: number;
};

export type RTCartItem = {
  productId: string;
  name: string;
  quantity: number;
  size: number;
  color: string;
};

export async function createCartItem({
  productId,
  name,
  price,
  quantity,
  color,
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
      color: color,
      image: image,
      size: size,
    },
    {}
  );
}

export type RTCartItems = {
  productId: string;
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
