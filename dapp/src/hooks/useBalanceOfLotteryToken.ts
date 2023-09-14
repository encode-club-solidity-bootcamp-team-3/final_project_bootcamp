import { useAccount, useContractRead } from "wagmi";
import lotteryTokenJson from "../contracts/LotteryToken.json";

export function useBalanceOfLotteryToken(contractAddress: `0x${string}`) {
  const { address } = useAccount();
  return useContractRead({
    address: contractAddress,
    abi: lotteryTokenJson.abi,
    functionName: "balanceOf",
    args: [address],
  });
}
