import { ethers } from "hardhat"; 
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    // Replace with the actual contract and token addresses
    const lotteryContractAddress = '0xc510e80F833Ed283212DE560b97097392F594323';
    const nftContractAddress = '0x87687a0d0ac168dc66f5819d3e0d56219b693e32';
  
    // Load the contract and contract token ABIs from the JSON files
    const lotteryContractABI = require('../artifacts/contracts/Lottery.sol/Lottery.json').abi;
    const nftContractABI = require('../artifacts/contracts/NFTContract.sol/NFTContract.json').abi;
  
    // Create instances of the contracts
    const lotteryContract = new ethers.Contract(lotteryContractAddress, lotteryContractABI, wallet);
    const nftContract = new ethers.Contract(nftContractAddress, nftContractABI, wallet);
   
   // Before calling closeLottery, do a check 
  
    const callerAddress = wallet.address;
    const nftOwner = await nftContract.ownerOf(85); // Replace with the correct tokenId
   
    console.log(nftOwner);
    console.log(callerAddress);

    // introduce tokenID to be transfered inside closeLottery
  
    const betTx = await lotteryContract.closeLottery(85);
    const receipt = await betTx.wait();
    console.log(receipt);
    return { success: true, txHash: betTx.hash };
}

main().catch((error) => {
    console.error("Error:", error);
});
