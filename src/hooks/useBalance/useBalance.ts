import { useBalance } from "wagmi";
export const useBalanceUSDT = ({ address }: { address: string }) => {
  const res = useBalance({
    address: address as `0x${string}`,
    token: "0xc1A67f2ad36b502dA1bf6Fe6B1eA7a83e73BBc4A",
    chainId: 23295,
  });
  return res;
};
