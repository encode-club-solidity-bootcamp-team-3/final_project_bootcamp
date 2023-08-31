import { ethers } from "hardhat"; 
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    // Replace with the actual contract and token addresses
    const lotteryContractAddress = '0x8fee3143154bc482305010b3cd9546c7f6f1a667';
    const nftContractAddress = '0xc6c08fc1d46103ef9c9afe1d1a690b475715577d';
  
    // Load the contract and contract token ABIs from the JSON files
    const lotteryContractABI = require('../artifacts/contracts/Lottery.sol/Lottery.json').abi;
    const nftContractABI = require('../artifacts/contracts/NFTContract.sol/NFTContract.json').abi;
  
    // Create instances of the contracts
    const lotteryContract = new ethers.Contract(lotteryContractAddress, lotteryContractABI, wallet);
    const nftContract = new ethers.Contract(nftContractAddress, nftContractABI, wallet);
  
   // const approval = await lotteryTokenContract.approve(process.env.LOTTERY_ADDRESS, ethers.parseEther(String("1")));
   
   // Before calling closeLottery
    const callerAddress = wallet.address;

    const nftOwner = await nftContract.ownerOf(65); // Replace with the correct tokenId
   
    console.log(nftOwner);
    console.log(callerAddress);

   
   const betTx = await lotteryContract.closeLottery(65);
    const receipt = await betTx.wait();
    console.log(receipt);
    return { success: true, txHash: betTx.hash };
}

main().catch((error) => {
    console.error("Error:", error);
});
