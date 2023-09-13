import { lotteryContractAddress } from '@/constants/contracts';
import { LotteryTokenContractInfo as ILotteryTokenContractInfo } from '@/types/LotteryTokenContractInfo';

export default async function LotteryTokenContractInfo() {
  const response = await fetch(
    `http://localhost:3001/lottery-token-contract-info/${lotteryContractAddress}`
  );
  const info: ILotteryTokenContractInfo = await response.json();

  return (
    <div className="rounded-lg border border-gray-200 shadow-md p-4 flex flex-col gap-4 bg-white">
      <h2 className="text-lg font-bold">
        Lottery Token Contract: {info.address}{" "}
        <a
          className="text-blue-500 hover:underline"
          href={`https://sepolia.etherscan.io/address/${info.address}`}
          target="_blank"
        >
          scan
        </a>
      </h2>
      {Object.entries(info)
        .filter(([key]) => key !== "address")
        .map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
    </div>
  );
}
