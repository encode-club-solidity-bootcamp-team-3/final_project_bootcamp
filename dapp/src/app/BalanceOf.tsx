'use client'

import { useAccount, useContractRead } from "wagmi";
import Card from "./Card";
import lotteryTokenJson from "../contracts/LotteryToken.json";
import { decimals } from "@/constants/decimals";

export function BalanceOf({ contractAddress }: { contractAddress: `0x${string}` }) {
  const { address } = useAccount();
  const { data, isError, isLoading, isFetching } = useContractRead({
    address: contractAddress,
    abi: lotteryTokenJson.abi,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <Card>
      <h2 className="text-lg font-bold">Wallet connected info</h2>
      <p>
        Balance:{" "}
        {isLoading || isFetching ? "Loading..." : Number(data) / decimals}{" "}
        <span className="text-xs">
          (todo: should refresh automatically after purchase)
        </span>
      </p>
    </Card>
  );
}
