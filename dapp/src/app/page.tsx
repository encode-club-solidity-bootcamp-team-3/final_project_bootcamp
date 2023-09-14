import { ConnectButton } from "@rainbow-me/rainbowkit";
import LotteryContractInfo from "./LotteryContractInfo/LotteryContractInfo";
import { lotteryContractAddress } from "@/constants/contracts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4 gap-4 bg-slate-200">
      <ConnectButton />
      <LotteryContractInfo contractAddress={lotteryContractAddress} />
    </main>
  );
}
