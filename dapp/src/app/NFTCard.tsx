import { Token } from '@/types/Token';
import Image from 'next/image'

export default function NFTCard({ contractAddress, token }: { contractAddress: string, token: Token }) {
  return (
    <div>
      <Image
        src={token.ipfsUrl}
        alt={`${token.tokenId} image`}
        height={160}
        width={160}
        priority
      />
      <p>
        token #{token.tokenId}{" "}
        <a
          className="text-blue-500 hover:underline"
          href={`https://sepolia.etherscan.io/nft/${contractAddress}/${token.tokenId}`}
          target="_blank"
        >
          scan
        </a>
      </p>
    </div>
  );
}
