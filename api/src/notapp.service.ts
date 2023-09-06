import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers'; 
import * as lotteryJson from './assets/Lottery.json';
import * as lotteryTokenJson from './assets/LotteryToken.json';
import 'dotenv/config';
require('dotenv').config();

//const LOTTERY_ADDRESS = '0x1C21eC7211a425E54Bd31eCfaa02A115B1Cf283f'; 
//const LOTTERY_TOKEN_ADDRESS = '0x6ca5990E111E46D5C079CA35B973f9FfA8b1d921'; 


const LOTTERY_ADDRESS = '0xD1F1791cBe4cd52ECA451304463377382c417632'; 
const LOTTERY_TOKEN_ADDRESS = '0xc2B9A95a019340ce14bA95B5266A0FE40fB13519'; 

@Injectable()
export class AppService {
  getHello(): string {
    throw new Error('Method not implemented.');
  }

  contract: ethers.Contract;
  contract_token: ethers.Contract;
  provider: ethers.JsonRpcProvider; // Use ethers.JsonRpcProvider instead of ethers.Provider
  wallet: ethers.Wallet; 

  constructor() { 

    this.provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? '');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '', this.provider);
    this.wallet = wallet; // Initialize this.wallet with the wallet instance
    this.contract = new ethers.Contract(LOTTERY_ADDRESS, lotteryJson.abi, wallet); 
    this.contract_token = new ethers.Contract(LOTTERY_TOKEN_ADDRESS, lotteryTokenJson.abi, wallet); 
  
  }

  async openBets(duration: string) {
    const currentBlock = await this.provider.getBlock('latest');
    const timestamp = currentBlock?.timestamp ?? 0;
    const tx = await this.contract.openBets(timestamp + Number(duration));
    const receipt = await tx.wait();
    console.log(`Bets opened (${receipt?.hash})`);
  }

  async checkState() {
    const state = await this.contract.betsOpen();
    console.log(`The lottery is ${state ? 'open' : 'closed'}\n`);
    if (!state) return;
    const currentBlock = await this.provider.getBlock('latest');
    const timestamp = currentBlock?.timestamp ?? 0;
    const currentBlockDate = new Date(timestamp * 1000);
    const closingTime = await this.contract.betsClosingTime();
    const closingTimeDate = new Date(Number(closingTime) * 1000);
    console.log(
      `The last block was mined at ${currentBlockDate.toLocaleDateString()} : ${currentBlockDate.toLocaleTimeString()}\n`
    );
    console.log(
      `lottery should close at ${closingTimeDate.toLocaleDateString()} : ${closingTimeDate.toLocaleTimeString()}\n`
    );
  }
 
  async buyTokens(amount: string) {

    const TOKEN_RATIO = 10n ** 15n;
    const tx = await this.contract.purchaseTokens({
      value: ethers.parseUnits(amount)/TOKEN_RATIO, // Corrected usage
    });
    const receipt = await tx.wait();
    console.log(`Tokens bought (${receipt?.hash})\n`);
  }
 


 async  displayTokenBalance() {
  const balanceBN = await this.contract_token.balanceOf(this.wallet.address);
  const balance = ethers.formatUnits(balanceBN);
  console.log(
    `The account of address ${
      this.wallet.address
    } has ${balance} GTONE\n`
  );
}

async bet(amount: string) {
  const contractAddress = await this.contract.getAddress();
  const allowTx = await this.contract_token.approve(contractAddress, ethers.MaxUint256);
  await allowTx.wait();

  const tx = await this.contract.betMany(amount);
  const receipt = await tx.wait();
  console.log(`Bets placed (${receipt?.hash})\n`);
}

async  closeLottery() {
  const tx = await this.contract.closeLottery();
  const receipt = await tx.wait();
  console.log(`Bets closed (${receipt?.hash})\n`);
}
 

async  displayPrize(): Promise<string> {
  const prizeBN = await this.contract.prize(this.wallet.address);
  const prize = ethers.formatUnits(prizeBN);
  console.log(
    `The account of address ${
      this.wallet.address
    } has earned a prize of ${prize} Tokens\n`
  );
  return prize;
}

async displayOwnerPool(): Promise<any>{
  const balanceBN = await this.contract.ownerPool();
  const balance = ethers.formatUnits(balanceBN);
  return (console.log(`The owner pool has (${balance}) Tokens \n`))
}

}




 
 
