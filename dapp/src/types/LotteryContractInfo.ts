import { LotteryStatus } from "./LotteryStatus";
import { Prize } from "./Prize";

export type LotteryContractInfo = {
  ownerPool: number;
  prizePool: number;
  betPrice: number;
  betFee: number;
  status: LotteryStatus;
  prize: Prize;
};