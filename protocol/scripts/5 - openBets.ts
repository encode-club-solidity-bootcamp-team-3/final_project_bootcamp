import { ethers } from "hardhat"; 
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    // Replace with the actual contract and token addresses
    const lotteryContractAddress = '0x30d29200fa4d936ddcf1d36bbfcc3a3781c685a7'; 
    // Load the contract and contract token ABIs from the JSON files
    const lotteryContractABI = require('../artifacts/contracts/Lottery.sol/Lottery.json').abi; 

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
    
    const tx = await lotteryContract.openBets(closingTimestamp, "0x153EAFb91B08B971121eD74CA61Adf3b7d9BA50C", "131");
    const receipt = await tx.wait();
    console.log(`Bets opened (${receipt?.hash})`);
}

main().catch((error) => {
    console.error("Error:", error);
});
