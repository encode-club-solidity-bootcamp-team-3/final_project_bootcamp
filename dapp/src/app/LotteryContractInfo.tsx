import { lotteryContractAddress } from '@/constants/contracts';

export default async function LotteryContractInfo() {
  const response = await fetch(
    `http://localhost:3001/.../${lotteryContractAddress}`
  );

  return (
    <div>
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
      <p>TODO</p>
    </div>
  );
}
