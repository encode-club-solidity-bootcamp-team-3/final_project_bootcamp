import { ethers } from "ethers";
import { NFTContract__factory } from "../typechain-types";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL!);

  const nftContract = NFTContract__factory.connect(
    "0x973Cf347cC98b9E264843522e8CdF61d776465EE",
    provider
  );

  const filter = nftContract.filters.Transfer;
  const events = await nftContract.queryFilter(filter, 0);
  const address0 = "0x0000000000000000000000000000000000000000";
  const tokenIds = events
    // args = [from, to, tokenId]
    .filter((event) => event.args[0] === address0)
    .map((event) => Number(event.args[2]));

    tokenIds.map(async (tokenId) => {
        const tokenUri = await nftContract.tokenURI(tokenId);
        // const tokenId = Number(tokenId);
        const ipfsUrl = `https://ipfs.io/ipfs/${tokenUri.split('//')[1]}`;
        console.log({ tokenId, tokenUri, ipfsUrl });
    });
}

main().catch((error) => {
    console.error("Error:", error);
});
