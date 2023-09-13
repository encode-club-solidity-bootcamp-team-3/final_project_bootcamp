import { nftContractAddress } from '@/constants/contracts';
import { Token } from '@/types/Token';
import Image from 'next/image'

export default async function NFTContractInfo() {
  const response = await fetch(
    `http://localhost:3001/tokens-minted/${nftContractAddress}`
  );
  const tokens = await response.json();

  return (
    <div className="rounded-lg border border-gray-200 shadow-md p-4 flex flex-col gap-4 bg-white">
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
            <Image
              src={token.ipfsUrl}
              alt={`${token.tokenId} image`}
              height={160}
              width={160}
            />
            <p>
              token #{token.tokenId}{" "}
              <a
                className="text-blue-500 hover:underline"
                href={`https://sepolia.etherscan.io/nft/${nftContractAddress}/${token.tokenId}`}
                target="_blank"
              >
                scan
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
