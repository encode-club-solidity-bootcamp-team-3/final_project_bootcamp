import { ethers } from "ethers";
import { NFTContract, NFTContract__factory } from "../typechain-types/";
import * as dotenv from "dotenv";
dotenv.config();

function setupProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}



async function main() {
    const provider = setupProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    const balanceBN = await provider.getBalance(wallet.address);
    const balance = Number(ethers.formatUnits(balanceBN));
    console.log(`\nWallet balance ${balance}.`);
    if (balance < 0.01) {
        throw new Error("Not enough ether.");
    }
    
    const NFTContractFactory = new NFTContract__factory(wallet);
    
    const NFTContract = await NFTContractFactory.deploy();
    await NFTContract.waitForDeployment();
    
    const contractAddress = await NFTContract.getAddress();
    
    console.log(`\NFT contract deployed to the address ${contractAddress}.`);
   
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
