import { lotteryContractAddress } from '@/constants/contracts';
import Card from './Card';

export default async function LotteryContractInfo() {
  const response = await fetch(
    `http://localhost:3001/.../${lotteryContractAddress}`
  );

  return (
    <Card>
      <h2 className="text-lg font-bold">
        Lottery Contract: {lotteryContractAddress}{" "}
        <a
          className="text-blue-500 hover:underline"
          href={`https://sepolia.etherscan.io/address/${lotteryContractAddress}`}
          target="_blank"
        >
          scan
        </a>
      </h2>
      <p>
        TODO: show lottery status, bet, show prize available for
        withdraw for each account, ...
      </p>
    </Card>
  );
}
