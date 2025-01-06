import axios, { AxiosRequestConfig } from "axios";

export async function getAuthAPI<ReturnType>(
  path: string,
  init?: AxiosRequestConfig
): Promise<ReturnType> {
  const jwt = localStorage.getItem("jwt");
  const res = await axios({
    url: path,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
    },
    withCredentials: true,
    ...init,
  });

  let data;
  try {
    data = res.data;
  } catch (error) {
    // pass
  }

  if (res.status >= 200 && res.status < 300) {
    return data;
  }

  throw Error(data?.message || res.statusText);
}

// export async function postAuthAPI<ReturnType>(
//   config: AxiosRequestConfig
// ): Promise<ReturnType> {
//   const jwt = localStorage.getItem("jwt");
//   return await axios({
//     ...config,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `${jwt}`,
//     },
//     withCredentials: true,
//     data: {},
//   });
// }

export async function getAPI<ReturnType>(
  url: string,
  config: AxiosRequestConfig
): Promise<ReturnType> {
  const jwt = localStorage.getItem("jwt");
  return (
    await axios.get(url, {
      headers: {
        Authorization: `${jwt}`,
        ...config.headers,
      },
      ...config,
    })
  ).data;
}

export async function postAPI<ReturnType>(
  url: string,
  data: any,
  config: AxiosRequestConfig
): Promise<ReturnType> {
  const jwt = localStorage.getItem("jwt");

  return (
    await axios.post(url, data, {
      headers: {
        Authorization: `${jwt}`,
        ...config.headers,
      },
      ...config,
    })
  ).data;
}

export async function deleteAPI<ReturnType>(
  url: string,
  config: AxiosRequestConfig
): Promise<ReturnType> {
  const jwt = localStorage.getItem("jwt");
  return (
    await axios.delete(url, {
      headers: {
        Authorization: `${jwt}`,
        ...config.headers,
      },
      ...config,
    })
  ).data;
}
