'use client'

import { lotteryContractAddress } from "@/constants/contracts";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import lotteryJson from "../../contracts/Lottery.json";
import Card from "../Card";

export function Bet() {
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
