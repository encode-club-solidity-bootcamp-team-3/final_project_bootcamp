import { ethers } from "ethers";
import { Lottery, LotteryToken, LotteryToken__factory, Lottery__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const lotteryContractAddress = "0x30d29200fa4d936ddcf1d36bbfcc3a3781c685a7";
const jordi = "0x1121A584c4CdB01753F030e0b50FAC9475b503DD";

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL!);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const lotteryFactory = new Lottery__factory(wallet);
  const lotteryContract = lotteryFactory.attach(lotteryContractAddress) as Lottery;

  const paymentAddress = await lotteryContract.paymentToken();

  const lotteryTokenFactory = new LotteryToken__factory(wallet);
  const lotteryTokenContract = lotteryTokenFactory.attach(
    paymentAddress
  ) as LotteryToken;

  const decimals = 1000000000000000000;
  const totalSupplyBigInt = await lotteryTokenContract.totalSupply();
  const totalSupply = Number(totalSupplyBigInt) / decimals;
  let balanceBigInt = await lotteryTokenContract.balanceOf(wallet.address);
  const myBalance = Number(balanceBigInt) / decimals;
  balanceBigInt = await lotteryTokenContract.balanceOf(jordi);
  const jordiBalance = Number(balanceBigInt) / decimals;
  console.log({
    paymentAddress,
    totalSupply,
    myBalance,
    jordiBalance,
  });
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
