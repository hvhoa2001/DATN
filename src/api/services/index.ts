import { getAPI, postAPI } from "../fetchFunction";

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
