import { ethers } from "ethers";
import { CapybaraToken__factory, Lottery, Lottery__factory, NFTContract__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

// const lotteryContractAddress = "0x30d29200fa4d936ddcf1d36bbfcc3a3781c685a7";
const lotteryContractAddress = "0x80E91B9742B2874c0ab3b8d766CbE318b71335eB";

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL!);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const lotteryFactory = new Lottery__factory(wallet);
  const lotteryContract = lotteryFactory.attach(lotteryContractAddress) as Lottery;

  const nftAddress = await lotteryContract.nftAddress();
  const nftTokenId = await lotteryContract.nftTokenId();

  // const nftContract = NFTContract__factory.connect(nftAddress, provider);
  const nftContract = CapybaraToken__factory.connect(nftAddress, provider);
  const tokenUri = await nftContract.tokenURI(nftTokenId);
  const ipfsUrl = tokenUri ? `https://ipfs.io/ipfs/${tokenUri.split("//")[1]}` : null;

  console.log({ nftAddress, nftTokenId, ipfsUrl });
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
