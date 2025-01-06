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
        chainId: 11155111,
        address: contractAddress as `0x${string}`,
        abi: getUSDTABI,
        functionName: "mint",
        args: [address, amount.toNumber()],
      });
    },
    [wagmiConfig, contractAddress]
  );
  const approve = useCallback(
    async (spender: string, value: BigNumber) => {
      return await writeContract(wagmiConfig, {
        chainId: 11155111,
        address: contractAddress as `0x${string}`,
        abi: getUSDTABI,
        functionName: "approve",
        args: [spender, value.toNumber()],
      });
    },
    [wagmiConfig, contractAddress]
  );
  const getAllowance = useCallback(
    async (owner: string, spender: string) => {
      return (await readContract(wagmiConfig, {
        chainId: 11155111,
        address: contractAddress as `0x${string}`,
        abi: getUSDTABI,
        functionName: "allowance",
        args: [owner, spender],
      })) as BigNumber;
    },
    [wagmiConfig, contractAddress]
  );
  return { faucetUSDT, approve, getAllowance };
}
