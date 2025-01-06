import { useBalance } from "wagmi";
export const useBalanceUSDT = ({ address }: { address: string }) => {
  const res = useBalance({
    address: address as `0x${string}`,
    token: "0x2A3fbEEc03B99A60f357165EaAbF836bDADADD3f",
    chainId: 11155111,
  });
  return res;
};
