import { nftContractAddress } from '@/constants/contracts';
import Image from 'next/image'

type Token = {
  tokenId: number;
  ipfsUrl: string;
};

export default async function Home() {
  const response = await fetch(
    `http://localhost:3001/tokens-minted/${nftContractAddress}`
  );
  const tokens = await response.json()

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <p>NFT Contract: {nftContractAddress}</p>
      <ul className="flex flex-wrap gap-4">
        {tokens.map((token: Token) => (
          <li key={token.tokenId}>
            <Image
              src={token.ipfsUrl}
              alt={`${token.tokenId} image`}
              height={320}
              width={320}
            />
            <p>
              token #{token.tokenId}{" "}
              <a
                className='text-blue-500 hover:underline'
                href={`https://sepolia.etherscan.io/nft/${nftContractAddress}/${token.tokenId}`}
                target='_blank'
              >
                see on scan
              </a>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
