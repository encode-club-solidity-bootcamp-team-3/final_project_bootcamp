'use client'

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import lotteryJson from "../../contracts/Lottery.json";
import lotteryTokenJson from "../../contracts/LotteryToken.json";
import Card from "../Card";
// import LotteryTokenContractInfo from "../LotteryTokenContractInfo";
import { LotteryContractInfo } from "@/types/LotteryContractInfo";

export function Bet({
  contractAddress: lotteryContractAddress,
  lotteryContractInfo,
}: {
  contractAddress: `0x${string}`;
  lotteryContractInfo: LotteryContractInfo;
}) {
  const {
    data: allowanceData,
    isLoading: allowanceIsLoading,
    isFetching: allowanceIsFetching,
    isRefetching: allowanceIsRefetching,
  } = useContractRead({
    address: lotteryContractAddress,
    abi: lotteryTokenJson.abi,
    functionName: "allowance",
    watch: true,
    // signerOrProvider: signer,
  });

  console.log(allowanceData, allowanceIsLoading, allowanceIsFetching, allowanceIsRefetching);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: lotteryContractAddress,
    abi: lotteryJson.abi,
    functionName: "bet",
    enabled: true,
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Card>
      <h2 className="text-lg font-bold">Bet</h2>
      <button
        disabled={!write || isLoading}
        type="submit"
        className="self-start p-y2 px-3 border border-gray-400 rounded hover:bg-slate-100 hover:cursor-pointer"
        onClick={() => write?.()}
      >
        {isLoading ? "Betting..." : "Bet"}
      </button>
      {isSuccess && (
        <div>
          Successfully bet!
          <div>
            <a
              href={`https://sepolia.etherscan.io/tx/${data?.hash}`}
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              Sepolia Testnet Explorer
            </a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div className="text-red-500">
          Error: {(prepareError || error)?.message}
        </div>
      )}
    </Card>
  );
}
