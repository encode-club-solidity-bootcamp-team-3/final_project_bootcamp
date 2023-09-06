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

  async openBets(address: string, closingTime: number): Promise<any> {
    console.log("Opening lottery at " + address + "...");
    const openTX = await this.contract.openBets(closingTime);
    const receipt = await openTX.wait();
    console.log(receipt);
    return { success: true, txHash: openTX.hash };
  }

  async buyTokens(address: string, amount: number): Promise<any> {
    console.log(`Purchasing ${amount} units of LTK for ${address}...`)
    const tx = await this.contract.purchaseTokens({
        value: amount, // Corrected usage
      });
    const receipt = await tx.wait();
    console.log(receipt);
    return { success: true, txHash: tx.hash };
  }

  async withdrawTokens(address: string, amount: number): Promise<any> {
    console.log(`Withdrawing ${amount} units of LTK from the prize pool for ${address}...`)
    const withdrawTX = await this.contract.prizeWithdraw(amount);
    const receipt = await withdrawTX.wait();
    console.log(receipt);
    return { success: true, txHash: withdrawTX.hash };
  }

  async checkState(): Promise<any> {
    const state = await this.contract.betsOpen();
    console.log(`The lottery is ${state ? "open" : "closed"}\n`);
    if (!state) return;
    const currentBlock = await this.provider.getBlock("latest");
    const timestamp = currentBlock?.timestamp ?? 0;
    const currentBlockDate = new Date(timestamp * 1000);
    const closingTime = await this.contract.betsClosingTime();
    const closingTimeDate = new Date(Number(closingTime) * 1000);
    return(
    console.log(
      `The last block was mined at ${currentBlockDate.toLocaleDateString()} : ${currentBlockDate.toLocaleTimeString()}\n
      lottery should close at ${closingTimeDate.toLocaleDateString()} : ${closingTimeDate.toLocaleTimeString()}\n`
    ))
  }

  async displayOwnerPool(): Promise<any>{
    const balanceBN = await this.contract.ownerPool();
    const balance = ethers.formatUnits(balanceBN);
    return (console.log(`The owner pool has (${balance}) Tokens \n`))
  }

  async closeLottery(): Promise<any> {
    console.log("Closing lottery at " + this.contract.address);
    const closeTX = await this.contract.closeLottery();
    const receipt = await closeTX.wait();
    const state = await this.contract.betsOpen();
    const winner = await this.contract.winner();
    const prize = await this.contract.prizePool();
    console.log(`The lottery is ${state ? "open" : "closed"}\n and the winner address is: ${winner} who won ${prize}`);
    
    console.log(receipt);
    return { success: true, txHash: closeTX.hash };
  }

  async burnTokens(amount: number): Promise<any> {
    console.log(`Burning ${amount} units of LTK in exchange for ETH back to user`)
    const withdrawTX = await this.contract.returnTokens(amount);
    const receipt = await withdrawTX.wait();
    console.log(receipt);
    return { success: true, txHash: withdrawTX.hash };
  }

}




 
 
