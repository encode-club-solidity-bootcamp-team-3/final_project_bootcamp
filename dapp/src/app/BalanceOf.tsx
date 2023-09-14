'use client'

import { decimals } from "@/constants/decimals";
import { useAccount, useContractRead } from "wagmi";
import lotteryTokenJson from "../contracts/LotteryToken.json";

export function BalanceOf({ contractAddress, symbol }: { contractAddress: `0x${string}`, symbol: string }) {
  const { address } = useAccount();
  const { data, isLoading, isFetching, isRefetching } = useContractRead({
    address: contractAddress,
    abi: lotteryTokenJson.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  return (
    <p>
      Your balance:{" "}
      {isLoading || isFetching || isRefetching
        ? "Loading..."
        : Number(data) / decimals} {symbol}
    </p>
  );
}
