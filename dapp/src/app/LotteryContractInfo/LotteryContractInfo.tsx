import Card from '../Card';
import Prize from './Prize';
import Status from './Status';
import { Bet } from './Bet';
import { LotteryContractInfo } from '@/types/LotteryContractInfo';
import LotteryTokenContractInfo from '../LotteryTokenContractInfo';

export default async function LotteryContractInfo({ contractAddress }: { contractAddress :string }) {
  const response = await fetch(
    `http://localhost:3001/lottery-contract-info/${contractAddress}`
  );
  const data: LotteryContractInfo = await response.json();

  return (
    <Card>
      <h2 className="text-lg font-bold">
        Lottery Contract: {contractAddress}{" "}
        <a
          className="text-blue-500 hover:underline"
          href={`https://sepolia.etherscan.io/address/${contractAddress}`}
          target="_blank"
        >
          scan
        </a>
      </h2>
      <div className="grid grid-cols-2 gap-4 break-words">
        <Prize lotteryContractInfo={data} />
        <Status lotteryContractInfo={data} />
        <LotteryTokenContractInfo contractAddress={contractAddress} />
        <Bet
          contractAddress={contractAddress}
          lotteryContractInfo={data}
        />
      </div>
    </Card>
  );
}
