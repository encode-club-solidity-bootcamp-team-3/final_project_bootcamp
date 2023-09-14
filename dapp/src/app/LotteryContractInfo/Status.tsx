import { decimals } from '@/constants/decimals';
import Card from '../Card';
import { LotteryContractInfo } from '@/types/LotteryContractInfo';

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZoneName: "short",
});

export default function Status({
  lotteryContractInfo,
}: {
  lotteryContractInfo: LotteryContractInfo;
}) {
  const { status, ownerPool, prizePool, betPrice, betFee } = lotteryContractInfo;
  const betsClosingTimeDate = new Date(status.betsClosingTime * 1000);
  const now = new Date();
  
  return (
    <Card>
      <h2 className="text-lg font-bold">Status</h2>
      <p>closing time is {dateFormatter.format(betsClosingTimeDate)}</p>
      <p>{status.betsOpen ? "🟢 bets are open" : "🔴 bets are closed"}</p>
      <p>
        {betsClosingTimeDate > now
          ? "🟢 lottery is open"
          : "🔴 lottery is closed"}
      </p>
      <p>ownerPool: {ownerPool}</p>
      <p>prizePool: {prizePool}</p>
      <p>betPrice: {betPrice / decimals}</p>
      <p>betFee: {betFee / decimals}</p>
    </Card>
  );
}
