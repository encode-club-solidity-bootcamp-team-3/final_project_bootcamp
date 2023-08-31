import { ethers } from "ethers";
import { Lottery, Lottery__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  
  // Replace with the actual contract address
  const lotteryContractAddress = "0x8fee3143154bc482305010b3cd9546c7f6f1a667";
  
  // Load the contract ABI
  const lotteryContractABI = require("../artifacts/contracts/Lottery.sol/Lottery.json").abi;
  
  // Create an instance of the Lottery contract
  const lotteryContract = new ethers.Contract(lotteryContractAddress, lotteryContractABI, wallet) as unknown as Lottery;
   
  const etherAmount = 0.01; // Change this to the desired amount

  // Convert the Ether amount to wei
  const weiAmount = ethers.parseEther(etherAmount.toString());

  // Call the purchaseTokens function and send Ether
  const purchaseTx = await lotteryContract.connect(wallet).purchaseTokens(weiAmount, { value: weiAmount });

  const purchaseReceipt = await purchaseTx.wait();
  //console.log(`Tokens purchased: ${ethers.formatUnits(tokenAmount)} tokens`);
  console.log("Transaction receipt:", purchaseReceipt);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
