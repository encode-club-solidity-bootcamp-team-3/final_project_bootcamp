"use client";

import Card from "../Card";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import lotteryTokenJson from "../../contracts/LotteryToken.json";
import { LotteryTokenContractInfo as ILotteryTokenContractInfo } from "@/types/LotteryTokenContractInfo";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function Approve({
  lotteryTokenContractInfo,
  contractAddress: lotteryContractAddress,
}: {
  lotteryTokenContractInfo: ILotteryTokenContractInfo;
  contractAddress: `0x${string}`;
}) {
  const [amount, setAmount] = useState("");
  const debouncedAmount = useDebounce(Number(amount));
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: lotteryTokenContractInfo.address,
    abi: lotteryTokenJson.abi,
    functionName: "approve",
    args: [lotteryContractAddress, debouncedAmount/*  * decimals */],
    enabled: Boolean(debouncedAmount),
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  return (
    <Card>
      <h2 className="text-lg font-bold">Need to allow?</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-2 flex-wrap">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            placeholder="amount to allow"
            value={amount}
          />
          <button
            disabled={!write || isLoading}
            type="submit"
            className="p-y2 px-3 border border-gray-400 rounded hover:bg-slate-100 hover:cursor-pointer"
          >
            {isLoading ? "Allowing..." : "Allow"}
          </button>
        </div>
        {isSuccess && (
          <div>
            Successfully allowed your tokens!
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
      </form>
    </Card>
  );
}
