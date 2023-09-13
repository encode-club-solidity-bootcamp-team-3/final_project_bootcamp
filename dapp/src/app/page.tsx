import LotteryContractInfo from "./LotteryContractInfo";
import LotteryTokenContractInfo from './LotteryTokenContractInfo';
import NFTContractInfo from './NFTContractInfo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <NFTContractInfo />
      <LotteryTokenContractInfo />
      <LotteryContractInfo />
    </main>
  );
}
