import { ethers } from "ethers";
import { NFTContract, NFTContract__factory } from "../typechain-types"; // Import both Lottery and Lottery__factory
import * as dotenv from "dotenv";
dotenv.config();

function setupProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

async function main() {
    const provider = setupProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    
    const nftContract = NFTContract__factory.connect("0xc6c08fc1d46103ef9c9afe1d1a690b475715577d", wallet
  );
    
    const recipientAddress = "0x1121A584c4CdB01753F030e0b50FAC9475b503DD"; // Replace with the recipient's address
    const tokenId = 65; // Specify the tokenId you want to mint
    
    // Mint the NFT
    const mintTransaction = await nftContract.safeMint(recipientAddress, tokenId);
    await mintTransaction.wait();

    console.log(`NFT with tokenId ${tokenId} minted successfully.`);
}

main().catch((error) => {
    console.error("Error:", error);
});
