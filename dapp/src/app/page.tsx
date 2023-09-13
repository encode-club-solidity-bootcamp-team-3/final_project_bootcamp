import { ConnectButton } from "@rainbow-me/rainbowkit";
import LotteryContractInfo from "./LotteryContractInfo";
import LotteryTokenContractInfo from './LotteryTokenContractInfo';
import NFTContractInfo from './NFTContractInfo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4 gap-4 bg-slate-200">
      <ConnectButton />
      <NFTContractInfo />
      <LotteryTokenContractInfo />
      <LotteryContractInfo />
    </main>
  );
}
