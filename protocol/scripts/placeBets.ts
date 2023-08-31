import { ethers } from "hardhat"; 
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    // Replace with the actual contract and token addresses
    const lotteryContractAddress = '0x8fee3143154bc482305010b3cd9546c7f6f1a667';
    const lotteryTokenContractAddress = '0x64b3BC95286A87C06a6aa8FcDc92dD3b2f695496';
 
    // Load the contract and contract token ABIs from the JSON files
    const lotteryContractABI = require('../artifacts/contracts/Lottery.sol/Lottery.json').abi;
    const lotteryTokenContractABI = require('../artifacts/contracts/LotteryToken.sol/LotteryToken.json').abi;
  
    // Create instances of the contracts
    const lotteryContract = new ethers.Contract(lotteryContractAddress, lotteryContractABI, wallet);
    const lotteryTokenContract = new ethers.Contract(lotteryTokenContractAddress, lotteryTokenContractABI, wallet);
  
    const allowTx = await lotteryTokenContract.approve(
        lotteryContractAddress,
        ethers.MaxUint256,
      );
      await allowTx.wait();
  
      console.log('Allowed', allowTx.hash);
   // const approval = await lotteryTokenContract.approve(process.env.LOTTERY_ADDRESS, ethers.parseEther(String("1")));
    const betTx = await lotteryContract.bet();
    
    const receipt = await betTx.wait();
    console.log(receipt);
    return { success: true, txHash: betTx.hash };
}

main().catch((error) => {
    console.error("Error:", error);
});
