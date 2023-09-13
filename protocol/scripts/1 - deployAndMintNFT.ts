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

     
    const capybaraFactory = new CapybaraToken__factory(wallet);
 
   
    // Deploy the contract
    const deployedContract = await capybaraFactory.deploy();


    await deployedContract.waitForDeployment();
    
    const capybaraAddress = await deployedContract.getAddress(); 
   
    console.log("Contract deployed to:", capybaraAddress);

    // Mint NFTs
    const mexicanCapybaraTokenURI = "ipfs://QmQ9XqniUyjh8pfCz4C47J1qobD98zvhK9yEs8tekD8jMg";
    const cowboyCapybaraTokenURI = "ipfs://QmZFx9hLtBDkcRknzfhwLieHiQ6mmFmm8h9rE8yJLH4cdn";

    await deployedContract.mintMexicanCapybara("0x1121A584c4CdB01753F030e0b50FAC9475b503DD", 0, mexicanCapybaraTokenURI);
    await deployedContract.mintCowboyCapybara("0x1121A584c4CdB01753F030e0b50FAC9475b503DD", 1, cowboyCapybaraTokenURI);

    console.log("NFTs minted!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
