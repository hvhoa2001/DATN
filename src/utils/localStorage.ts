export function getStorageItem(key: string) {
  if (!key) {
    return undefined;
  }
  return localStorage.getItem(key);
}

export function setStorageItem(key: string, value: string) {
  if (!key || !value) {
    return;
  }
  localStorage.setItem(key, value);
}

// export function getJWT() {
//   return localStorage.getItem("jwt");
// }
// export function setJWT() {
//   return localStorage.setItem("jwt", JSON.stringify(jwt));
// }
