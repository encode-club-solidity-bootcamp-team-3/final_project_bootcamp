'use client'

import Card from "./Card";
import { decimals } from "@/constants/decimals";
import { useBalanceOfLotteryToken } from "@/hooks/useBalanceOfLotteryToken";

export function BalanceOf({ contractAddress }: { contractAddress: `0x${string}` }) {
  const { data, isLoading, isFetching, isRefetching } =
    useBalanceOfLotteryToken(contractAddress);

  return (
    <Card>
      <h2 className="text-lg font-bold">Wallet connected info</h2>
      <p>
        Balance:{" "}
        {isLoading || isFetching || isRefetching
          ? "Loading..."
          : Number(data) / decimals}
      </p>
    </Card>
  );
}
