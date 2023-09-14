import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { LotteryToken, LotteryToken__factory } from "../typechain-types";
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL!);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const lotteryContractAddress =
    "0xF377364D038e9053a6750392Df1734A3A6Ced2d3";
  const lotteryTokenContractAddress =
    "0xc60BFd5a59AB4fDd136B28637631947160C25B20";

  const lotteryTokenFactory = new LotteryToken__factory(wallet);
  const lotteryTokenContract = lotteryTokenFactory.attach(
    lotteryTokenContractAddress
  ) as LotteryToken;

  const data = await lotteryTokenContract.allowance(
    wallet.address,
    lotteryContractAddress,
  );

  console.log("Allowance", Number(data));
}

main().catch((error) => {
  console.error("Error:", error);
});
