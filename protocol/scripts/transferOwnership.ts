import { ethers } from "ethers";
// import { Lotteryfactory } from "../typechain-types/"; // Import both Lottery and Lotteryfactory
import { Lottery__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

function setupProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

async function transferOwnership() {
    const provider = setupProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    const lotteryAddress = "0x973Cf347cC98b9E264843522e8CdF61d776465EE"; // Replace with your lottery contract address
    const newOwnerAddress = "0x1121A584c4CdB01753F030e0b50FAC9475b503DD"; // Replace with the address you want to transfer ownership to
    //0x4275ABc88C150d1ce20817BE7B594dfeB6A9d70E
    const lotteryContract = Lottery__factory.connect(lotteryAddress, wallet);

    // Check the current owner
    const currentOwner = await lotteryContract.owner();
    console.log(`Current owner of the contract: ${currentOwner}`);

    // Check if the sender is the current owner
    if (currentOwner.toLowerCase() !== wallet.address.toLowerCase()) {
        throw new Error("You are not the current owner of the contract.");
    }

    // Transfer ownership to the new address
    const transaction = await lotteryContract.transferOwnership(newOwnerAddress);
    await transaction.wait();

    // Check the new owner
    const newOwner = await lotteryContract.owner();
    console.log(`Ownership of the contract transferred to: ${newOwner}`);
}

transferOwnership().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
