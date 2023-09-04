import { ethers } from "ethers";
import { Lottery__factory } from "../typechain-types/"; // Import both Lottery and Lottery__factory
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
    
    const lotteryFactory = new Lottery__factory(wallet);
    const tokenName = "Group 3 test 1";
    const tokenSymbol = "GTONE";
    const purchaseRatio = 1000; // Example value, adjust as needed
    const betPrice = 10; // Example value, adjust as needed
    const betFee = 2; // Example value, adjust as needed 
    const lotteryContract = await lotteryFactory.deploy(
        tokenName,
        tokenSymbol,
        purchaseRatio,
        ethers.parseUnits(betPrice.toFixed(18)),
        ethers.parseUnits(betFee.toFixed(18))
      );
    await lotteryContract.waitForDeployment();
    
    const lotteryTokenAddress = await lotteryContract.paymentToken(); // Get the LotteryToken contract address
    const lotteryAddress = await lotteryContract.getAddress();
    
    console.log(`\nLottery contract deployed to the address ${lotteryAddress}.`);
    console.log(`Lottery Token contract address: ${lotteryTokenAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
