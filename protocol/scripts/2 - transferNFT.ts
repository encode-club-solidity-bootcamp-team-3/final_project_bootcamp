import { ethers } from "ethers";
import { NFTContract, CapybaraToken__factory } from "../typechain-types"; // Import both Lottery and Lottery__factory
import * as dotenv from "dotenv";
dotenv.config();

function setupProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

async function main() {
    const provider = setupProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    
    const nftContract = CapybaraToken__factory.connect("0x973cf347cc98b9e264843522e8cdf61d776465ee", wallet
  );

    const sender = "0x1121A584c4CdB01753F030e0b50FAC9475b503DD" 
    const receiver = "0x80E91B9742B2874c0ab3b8d766CbE318b71335eB"; // Replace with the recipient's address
    const tokenId = 0; // 
    

    //const mintTransaction = await nftContract.transferNFT(sender, receiver, tokenId);
    const mintTransaction = await nftContract.transferFrom(sender, receiver, tokenId)
    await mintTransaction.wait();

    console.log(`NFT with tokenId ${tokenId} transfered from ${sender} to ${receiver} successfully.`);
}

main().catch((error) => {
    console.error("Error:", error);
});
