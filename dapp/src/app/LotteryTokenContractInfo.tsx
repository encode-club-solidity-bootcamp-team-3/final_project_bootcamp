import { lotteryContractAddress } from '@/constants/contracts';
import { LotteryTokenContractInfo as ILotteryTokenContractInfo } from '@/types/LotteryTokenContractInfo';
import Card from './Card';
import { Purchase } from './Purchase';
import { BalanceOf } from './BalanceOf';
import { shortenAddress } from '@/utils/shortenAddress';

export default async function LotteryTokenContractInfo() {
  const response = await fetch(
    `http://localhost:3001/lottery-token-contract-info/${lotteryContractAddress}`
  );
  const info: ILotteryTokenContractInfo = await response.json();

  return (
    <Card>
      <h2 className="text-lg font-bold">Lottery Token</h2>

      <div className="grid grid-cols-2 gap-4 break-words">
        <Card>
          <p>
            contract: {shortenAddress(info.address)}{" "}
            <a
              className="text-blue-500 hover:underline"
              href={`https://sepolia.etherscan.io/address/${info.address}`}
              target="_blank"
            >
              scan
            </a>
          </p>
          {/* <p>symbol: {info.symbol}</p> */}
          <BalanceOf contractAddress={info.address} symbol={info.symbol} />
          {/* <p>totalSupply: {info.totalSupply}</p> */}
        </Card>

        <Purchase lotteryTokenContractInfo={info} />
      </div>
    </Card>
  );
}
