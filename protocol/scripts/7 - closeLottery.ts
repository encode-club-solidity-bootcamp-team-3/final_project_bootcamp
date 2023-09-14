import { ethers } from "hardhat"; 
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    // Replace with the actual contract and token addresses
    const lotteryContractAddress = '0xF377364D038e9053a6750392Df1734A3A6Ced2d3';

    // Load the contract and contract token ABIs from the JSON files
    const lotteryContractABI = require('../artifacts/contracts/Lottery.sol/LotteryNEW.json').abi;
  
    // Create instances of the contracts
    const lotteryContract = new ethers.Contract(lotteryContractAddress, lotteryContractABI, wallet);
   
    const betTx = await lotteryContract.closeLottery();
    const receipt = await betTx.wait();
    console.log(receipt);
    return { success: true, txHash: betTx.hash };
}

main().catch((error) => {
    console.error("Error:", error);
});
