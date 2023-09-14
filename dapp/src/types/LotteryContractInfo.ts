import { LotteryStatus } from "./LotteryStatus";
import { Prize } from "./Prize";

export type LotteryContractInfo = {
  ownerPool: number;
  prizePool: number;
  status: LotteryStatus;
  prize: Prize;
};