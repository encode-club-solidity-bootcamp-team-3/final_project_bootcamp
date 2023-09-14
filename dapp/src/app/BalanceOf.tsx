'use client'

import { decimals } from "@/constants/decimals";
import { useBalanceOfLotteryToken } from "@/hooks/useBalanceOfLotteryToken";

export function BalanceOf({ contractAddress, symbol }: { contractAddress: `0x${string}`, symbol: string }) {
  const { data, isLoading, isFetching, isRefetching } =
    useBalanceOfLotteryToken(contractAddress);

  return (
    <p>
      Your balance:{" "}
      {isLoading || isFetching || isRefetching
        ? "Loading..."
        : Number(data) / decimals} {symbol}
    </p>
  );
}
