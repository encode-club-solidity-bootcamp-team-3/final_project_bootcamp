import { ethers } from "hardhat"; 
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    // Replace with the actual contract address
    const lotteryContractAddress = '0xc510e80F833Ed283212DE560b97097392F594323'; 
    
    // Load the contract ABIs from the JSON files
    const lotteryContractABI = require('../artifacts/contracts/LotteryNew.sol/LotteryNew.json').abi;
    
    // Create instances of the contract
    const lotteryContract = new ethers.Contract(lotteryContractAddress, lotteryContractABI, wallet); 

    // Get the current block timestamp
    const currentBlock = await provider.getBlock("latest");
    const timestamp = currentBlock?.timestamp ?? 0;

    // Specify the duration for opening bets
    const durationInSeconds = 200;

    // Calculate the closing timestamp
    const closingTimestamp = timestamp + durationInSeconds;

    // Call the openBets function on the contract
    const tx = await lotteryContract.openBets(closingTimestamp);
    const receipt = await tx.wait();
    console.log(`Bets opened (${receipt?.hash})`);
}

main().catch((error) => {
    console.error("Error:", error);
});
