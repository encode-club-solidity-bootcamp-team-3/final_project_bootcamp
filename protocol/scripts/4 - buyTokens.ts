import { ethers } from "ethers";
import { LotteryNEW } from "../typechain-types/";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  
  // Replace with the actual contract address
  const lotteryContractAddress = "0xF377364D038e9053a6750392Df1734A3A6Ced2d3";
  
  // Load the contract ABI
  const lotteryContractABI = require("../artifacts/contracts/Lottery.sol/LotteryNEW.json").abi;
  
  // Create an instance of the Lottery contract
  const lotteryContract = new ethers.Contract(lotteryContractAddress, lotteryContractABI, wallet) as unknown as LotteryNEW;
  
  const etherAmount = 0.03; // Change this to the desired amount

  // Convert the Ether amount to wei
  const weiAmount = ethers.parseEther(etherAmount.toString());

  // Call the purchaseTokens function and send Ether
  const purchaseTx = await lotteryContract.connect(wallet).purchaseTokens(weiAmount, { value: weiAmount });

  const purchaseReceipt = await purchaseTx.wait();


  console.log("Transaction receipt:", purchaseReceipt);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
