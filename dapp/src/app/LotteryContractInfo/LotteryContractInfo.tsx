import { lotteryContractAddress } from '@/constants/contracts';
import Card from '../Card';
import Prize from './Prize';
import Status from './Status';
import { Bet } from './Bet';
import PrizeAvailableForWithdrawForEachAccount from './PrizeAvailableForWithdrawForEachAccount';
import { LotteryContractInfo } from '@/types/LotteryContractInfo';

export default async function LotteryContractInfo() {
  const response = await fetch(
    `http://localhost:3001/lottery-contract-info/${lotteryContractAddress}`
  );
  const data: LotteryContractInfo = await response.json();

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
      <div className="grid grid-cols-3 gap-4 break-words">
        <Prize lotteryContractInfo={data} />
        <Status lotteryContractInfo={data} />
        <Bet />
        <PrizeAvailableForWithdrawForEachAccount lotteryContractInfo={data} />
      </div>
    </Card>
  );
}
