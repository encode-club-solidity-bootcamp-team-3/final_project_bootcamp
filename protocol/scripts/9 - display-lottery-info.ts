import { ethers } from "ethers";
import { Lottery, LotteryToken } from "../typechain-types/";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );

  const lotteryContractAddress = "0x30d29200fa4d936ddcf1d36bbfcc3a3781c685a7";

  const lotteryContractABI =
    require("../artifacts/contracts/Lottery.sol/Lottery.json").abi;

  const lotteryTokenContractABI =
    require("../artifacts/contracts/LotteryToken.sol/LotteryToken.json").abi;

  const lotteryContract = new ethers.Contract(
    lotteryContractAddress,
    lotteryContractABI,
    provider
  ) as unknown as Lottery;

  const purchaseRatio = await lotteryContract.purchaseRatio();
  
  const paymentTokenAddress = await lotteryContract.paymentToken();
  
  const lotteryTokenContract = new ethers.Contract(
    paymentTokenAddress,
    lotteryTokenContractABI,
    provider
  ) as unknown as LotteryToken;

  const paymentTokenName = await lotteryTokenContract.name();
  const paymentTokenSymbol = await lotteryTokenContract.symbol();
  const paymentTokenTotalSupply = await lotteryTokenContract.totalSupply();

  console.log(
    "🔥",
    {paymentTokenAddress,
    purchaseRatio,
    paymentTokenName,
    paymentTokenSymbol,
    paymentTokenTotalSupply: Number(paymentTokenTotalSupply)}
  );
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
