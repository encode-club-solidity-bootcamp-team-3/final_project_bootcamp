import { ethers } from "ethers";
import { NFTContract, NFTContract__factory } from "../typechain-types/"; // Import both Lottery and Lottery__factory
import * as dotenv from "dotenv";
dotenv.config();

function setupProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

async function main() {
    const provider = setupProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    // Insert here NFT Contract address
    const nftContract = NFTContract__factory.connect("0x87687a0d0ac168dc66f5819d3e0d56219b693e32", wallet
  );
    
    const recipientAddress = "0x1121A584c4CdB01753F030e0b50FAC9475b503DD"; // Replace with the recipient's address
    const tokenId = 85; // Specify the tokenId you want to mint
    
    // Mint the NFT
    const mintTransaction = await nftContract.safeMint(recipientAddress, tokenId);
    await mintTransaction.wait();

    console.log(`NFT with tokenId ${tokenId} minted successfully.`);
}

main().catch((error) => {
    console.error("Error:", error);
});
