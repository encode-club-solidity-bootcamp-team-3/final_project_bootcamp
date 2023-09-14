import Card from '../Card';
import NFTCard from '../NFTCard';
import { LotteryContractInfo } from '@/types/LotteryContractInfo';

export default function Prize({
  lotteryContractInfo,
}: {
  lotteryContractInfo: LotteryContractInfo;
}) {
  const { prize } = lotteryContractInfo;
  return (
    <Card>
      <h2 className="text-lg font-bold">Prize</h2>
      <NFTCard contractAddress={prize.nftAddress} token={prize.token} />
    </Card>
  );
}
