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

    // Get the current block timestamp
    const currentBlock = await provider.getBlock("latest");
    const timestamp = currentBlock?.timestamp ?? 0;

    // Specify the duration for opening bets
    const durationInSeconds = 3600;

    // Calculate the closing timestamp
    const closingTimestamp = timestamp + durationInSeconds;

    // Call the openBets function on the contract

    // Modify with NFT address and tokenID
    
    const tx = await lotteryContract.openBets(closingTimestamp, "0x9E78C2453CA42856ca88215a0D30d19F45107715", "0");
    const receipt = await tx.wait();
    console.log(`Bets opened (${receipt?.hash})`);
}

main().catch((error) => {
    console.error("Error:", error);
});
