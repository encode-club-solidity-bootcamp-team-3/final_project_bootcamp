import { ethers } from "hardhat";
import { Lottery, Lottery__factory, LotteryToken, LotteryToken__factory } from "../typechain-types";
import * as readline from "readline"; 
import * as dotenv from "dotenv";
dotenv.config();

let contract: Lottery; 
 

async function main() { 
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    
    // Address of the deployed Lottery contract
    const contractAddress = "0x8fee3143154bc482305010b3cd9546c7f6f1a667";

    // Connect to the deployed Lottery contract
    contract = Lottery__factory.connect(contractAddress, wallet);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Now you can call the function to buy tokens
   rl.question("Enter the amount of tokens to buy: ", async (amount) => {
            try {
                await buyTokens(amount);
            } catch (error) {
                console.log("Error buying tokens:\n", error);
            }
            rl.close();
        });
  
}

async function buyTokens(amount: string) {

    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
     

    const tx = await contract.purchaseTokens(ethers.parseEther(String(amount)));
    
    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    console.log(`Tokens bought (${receipt?.hash})\n`);
}

main().catch((error) => {
    console.error("Error in main function:", error);
    process.exit(1);
});