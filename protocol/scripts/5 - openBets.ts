import { ethers } from "hardhat"; 
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    // Replace with the actual contract and token addresses
    const lotteryContractAddress = '0x80E91B9742B2874c0ab3b8d766CbE318b71335eB'; 
    // Load the contract and contract token ABIs from the JSON files
    const lotteryContractABI = require('../artifacts/contracts/LotteryNEW.sol/LotteryNEW.json').abi; 

    // Create instances of the contracts
    const lotteryContract = new ethers.Contract(lotteryContractAddress, lotteryContractABI, wallet); 

    // Get the current block timestamp
    const currentBlock = await provider.getBlock("latest");
    const timestamp = currentBlock?.timestamp ?? 0;

    // Specify the duration for opening bets
    const durationInSeconds = 200;

    // Calculate the closing timestamp
    const closingTimestamp = timestamp + durationInSeconds;

    // Call the openBets function on the contract

    // Modify with NFT address and tokenID
    
    const tx = await lotteryContract.openBets(closingTimestamp, "0x973Cf347cC98b9E264843522e8CdF61d776465EE", "0");
    const receipt = await tx.wait();
    console.log(`Bets opened (${receipt?.hash})`);
}

main().catch((error) => {
    console.error("Error:", error);
});
