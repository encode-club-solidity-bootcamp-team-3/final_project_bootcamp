import { ethers } from "ethers";
import { Lottery } from "../typechain-types/";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  
  // Replace with the actual contract address
  const lotteryContractAddress = "0x30d29200fa4d936ddcf1d36bbfcc3a3781c685a7";
  
  // Load the contract ABI
  const lotteryContractABI = require("../artifacts/contracts/Lottery.sol/Lottery.json").abi;
  
  // Create an instance of the Lottery contract
  const lotteryContract = new ethers.Contract(lotteryContractAddress, lotteryContractABI, wallet) as unknown as Lottery;
  
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
