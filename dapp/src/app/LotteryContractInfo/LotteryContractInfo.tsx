import Card from '../Card';
import Prize from './Prize';
import Status from './Status';
import { Bet } from './Bet';
import { LotteryContractInfo } from '@/types/LotteryContractInfo';
import LotteryTokenContractInfo from '../LotteryTokenContractInfo';
import { LotteryTokenContractInfo as ILotteryTokenContractInfo } from "@/types/LotteryTokenContractInfo";

export default async function LotteryContractInfo({ contractAddress }: { contractAddress: `0x${string}` }) {
  const [dataLottery, dataLotteryToken]: [
    LotteryContractInfo,
    ILotteryTokenContractInfo
  ] = await Promise.all([
    fetch(
      `http://localhost:3001/lottery-contract-info/${contractAddress}`
    ).then((response) => response.json()),
    fetch(
      `http://localhost:3001/lottery-token-contract-info/${contractAddress}`
    ).then((response) => response.json()),
  ]);

  return (
    <Card>
      <h2 className="text-lg font-bold">
        Lottery {contractAddress}{" "}
        <a
          className="text-blue-500 hover:underline"
          href={`https://sepolia.etherscan.io/address/${contractAddress}`}
          target="_blank"
        >
          scan
        </a>
      </h2>
      <div className="grid grid-cols-2 gap-4 break-words">
        <Prize lotteryContractInfo={dataLottery} />
        <Status lotteryContractInfo={dataLottery} />
        <LotteryTokenContractInfo contractAddress={contractAddress} />
        <Bet
          contractAddress={contractAddress}
          lotteryTokenContractInfo={dataLotteryToken}
        />
      </div>
    </Card>
  );
}
