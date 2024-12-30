import { useCallback } from "react";
import { readContract, writeContract } from "@wagmi/core";
import { wagmiConfig } from "@datn/wagmi/config";
import USDT from "@datn/web3/ABI/USDT.json";
import BigNumber from "bignumber.js";

const getUSDTABI = [...USDT.abi] as const;

export default function useUSDTContract({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const faucetUSDT = useCallback(
    async (address: string, amount: BigNumber) => {
      return await writeContract(wagmiConfig, {
        chainId: 23295,
        address: contractAddress as `0x${string}`,
        abi: getUSDTABI,
        functionName: "mint",
        args: [address, amount.toNumber()],
      });
    },
    [wagmiConfig, contractAddress]
  );
  return { faucetUSDT };
}
