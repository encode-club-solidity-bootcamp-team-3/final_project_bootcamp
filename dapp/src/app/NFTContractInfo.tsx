import { nftContractAddress } from '@/constants/contracts';
import { Token } from '@/types/Token';
import Card from './Card';
import NFTCard from './NFTCard';

export default async function NFTContractInfo() {
  const response = await fetch(
    `http://localhost:3001/tokens-minted/${nftContractAddress}`
  );
  const tokens = await response.json();

  return (
    <Card>
      <h2 className="text-lg font-bold">
        NFT Contract: {nftContractAddress}{" "}
        <a
          className="text-blue-500 hover:underline"
          href={`https://sepolia.etherscan.io/address/${nftContractAddress}`}
          target="_blank"
        >
          scan
        </a>
      </h2>
      <ul className="flex flex-wrap gap-4">
        {tokens.map((token: Token) => (
          <li key={token.tokenId}>
            <NFTCard contractAddress={nftContractAddress} token={token} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
