import { ethers } from "ethers";
import { CapybaraToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

function setupProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

async function main() {
    const provider = setupProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    const contractAddress = "0x9E78C2453CA42856ca88215a0D30d19F45107715";
    const tokenId = 0; // Replace with the specific token ID you want to check
    const nftContract = CapybaraToken__factory.connect(contractAddress, wallet);
    const tokenURI = await nftContract.tokenURI(tokenId);
    // Construct the full URL to access the IPFS metadata
    const ipfsMetadataURL = `https://ipfs.io/ipfs/${tokenURI.split("://")[1]}`;
    console.log(`IPFS Metadata URL for Token ${tokenId}: ${ipfsMetadataURL}`);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
