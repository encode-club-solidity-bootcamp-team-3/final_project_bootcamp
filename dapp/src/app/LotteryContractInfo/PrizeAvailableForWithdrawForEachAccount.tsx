import { lotteryContractAddress } from '@/constants/contracts';
import Card from '../Card';
import { LotteryStatus } from '@/types/LotteryStatus';
import { LotteryContractInfo } from '@/types/LotteryContractInfo';

export default function PrizeAvailableForWithdrawForEachAccount({
  lotteryContractInfo,
}: {
  lotteryContractInfo: LotteryContractInfo;
}) {
  return (
    <Card>
      <h2 className="text-lg font-bold">
        Prize Available For Withdraw For Each Account
      </h2>
    </Card>
  );
}
