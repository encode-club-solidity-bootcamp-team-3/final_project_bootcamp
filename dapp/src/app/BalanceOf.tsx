'use client'

import { useAccount, useContractRead } from "wagmi";
import Card from "./Card";
import lotteryTokenJson from "../contracts/LotteryToken.json";
import { decimals } from "@/constants/decimals";

export function BalanceOf({ contractAddress }: { contractAddress: `0x${string}` }) {
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: lotteryTokenJson.abi,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <Card>
      <h2 className="text-lg font-bold">Wallet info</h2>
      <p>Balance: {isLoading ? "Loading..." : Number(data) / decimals}</p>
      <p>(todo: refresh automatically after purchase)</p>
    </Card>
  );
}
