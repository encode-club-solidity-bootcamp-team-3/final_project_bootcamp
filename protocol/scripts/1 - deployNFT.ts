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
 
  console.log(`Deploying from address: ${wallet.address}`);

  const capybaraContract = await capybaraFactory.deploy(
  );

  await capybaraContract.waitForDeployment();
    
  const capybaraAddress = await capybaraContract.getAddress(); 
  
  console.log(`\Capybara contract deployed to the address ${capybaraAddress}.`); 
}

main().catch((error) => {
console.error(error);
process.exitCode = 1;
});
