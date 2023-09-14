'use client'

import {
  useContractRead,
  useAccount,
} from "wagmi";
import lotteryTokenJson from "../../contracts/LotteryToken.json";
import Card from "../Card";
import { LotteryTokenContractInfo as ILotteryTokenContractInfo } from "@/types/LotteryTokenContractInfo";
import PlaceBet from "./PlaceBet";
import Approve from "./Approve";

export function Bet({
  contractAddress: lotteryContractAddress,
  lotteryTokenContractInfo,
}: {
  contractAddress: `0x${string}`;
  lotteryTokenContractInfo: ILotteryTokenContractInfo;
}) {
  const { address } = useAccount();
  const {data} = useContractRead({
    address: lotteryTokenContractInfo.address,
    abi: lotteryTokenJson.abi,
    functionName: "allowance",
    watch: true,
    args: [address, lotteryContractAddress],
  });

  return (
    <Card>
      <h2 className="text-lg font-bold">Bet</h2>
      <p>Allowance: {data ? Number(data) : 0}</p>
      <div className="grid grid-cols-2 gap-4 break-words">
        <Approve
          lotteryTokenContractInfo={lotteryTokenContractInfo}
          contractAddress={lotteryContractAddress}
        />
        {Number(data) > 0 && (
          <PlaceBet
            allowance={Number(data)}
            contractAddress={lotteryContractAddress}
          />
        )}
      </div>
    </Card>
  );
}
