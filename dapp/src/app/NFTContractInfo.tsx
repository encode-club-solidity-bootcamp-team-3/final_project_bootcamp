import { Token } from '@/types/Token';
import Card from './Card';
import NFTCard from './NFTCard';

export default async function NFTContractInfo({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const response = await fetch(
    `http://localhost:3001/tokens-minted/${contractAddress}`
  );
  const tokens = await response.json();

  return (
    <Card>
      <h2 className="text-lg font-bold">
        NFT Contract: {contractAddress}{" "}
        <a
          className="text-blue-500 hover:underline"
          href={`https://sepolia.etherscan.io/address/${contractAddress}`}
          target="_blank"
        >
          scan
        </a>
      </h2>
      <ul className="flex flex-wrap gap-4">
        {tokens.map((token: Token) => (
          <li key={token.tokenId}>
            <NFTCard contractAddress={contractAddress} token={token} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
