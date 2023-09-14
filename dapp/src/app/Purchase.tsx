'use client'

import { lotteryContractAddress } from "@/constants/contracts";
import { useDebounce } from "@/hooks/useDebounce";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import lotteryJson from "../contracts/Lottery.json";
import { ChangeEvent, useState } from "react";
import { decimals } from "@/constants/decimals";
import Card from "./Card";
import { useBalanceOfLotteryToken } from "@/hooks/useBalanceOfLotteryToken";
import { LotteryTokenContractInfo as ILotteryTokenContractInfo } from "@/types/LotteryTokenContractInfo";

export function Purchase({
  lotteryTokenContractInfo,
}: {
  lotteryTokenContractInfo: ILotteryTokenContractInfo;
}) {
  const [amount, setAmount] = useState("");
  const debouncedAmount = useDebounce(Number(amount));
  const { refetch } = useBalanceOfLotteryToken(lotteryTokenContractInfo.address);
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: lotteryContractAddress,
    abi: lotteryJson.abi,
    functionName: "purchaseTokens",
    args: [debouncedAmount * decimals],
    enabled: Boolean(debouncedAmount),
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  if (isSuccess) refetch();

  return (
    <Card>
      <h2 className="text-lg font-bold">Purchase lottery tokens</h2>
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
            placeholder={`${
              1 / lotteryTokenContractInfo.ratio
            } eth buys 1 token`}
            value={amount}
          />
          <button
            disabled={!write || isLoading}
            type="submit"
            className="p-y2 px-3 border border-gray-400 rounded hover:bg-slate-100 hover:cursor-pointer"
          >
            {isLoading ? "Purchasing..." : "Purchase"}
          </button>
        </div>
        {isSuccess && (
          <div>
            Successfully purchased your tokens!
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
