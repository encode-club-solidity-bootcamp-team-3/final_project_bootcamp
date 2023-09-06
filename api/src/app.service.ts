import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
//import * as lotteryJson from './assets/Lottery.json';
import * as lotteryTokenJson from './assets/LotteryToken.json';
import * as lotteryJson from './assets/LotteryNew.json';

//const LOTTERY_ADDRESS = '0x30d29200fa4d936ddcf1d36bbfcc3a3781c685a7';
//const LOTTERY_TOKEN_ADDRESS = '0x9f89f7b50e7b3ee9429b1d1c9f7d4d47979e1aba';

const LOTTERY_ADDRESS = '0xF1f0F0872d8b9643F9AF731792B30c9884BAAeB0';
const LOTTERY_TOKEN_ADDRESS = '0x0715E7485c0D336824f2A77915f543bdC1dCF1fE';

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
    this.provider = new ethers.JsonRpcProvider(
      process.env.RPC_ENDPOINT_URL ?? '',
    );
    const wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY ?? '',
      this.provider,
    );
    this.wallet = wallet; // Initialize this.wallet with the wallet instance
    this.contract = new ethers.Contract(
      LOTTERY_ADDRESS,
      lotteryJson.abi,
      wallet,
    );
    this.contract_token = new ethers.Contract(
      LOTTERY_TOKEN_ADDRESS,
      lotteryTokenJson.abi,
      wallet,
    );
  }

  async openBets(duration: string, nftAddress: string, tokenID: string) {
    const currentBlock = await this.provider.getBlock('latest');
    const timestamp = currentBlock?.timestamp ?? 0;
    const tx = await this.contract.openBets(timestamp + Number(duration), nftAddress, tokenID );
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
      `The last block was mined at ${currentBlockDate.toLocaleDateString()} : ${currentBlockDate.toLocaleTimeString()}\n`,
    );
    console.log(
      `lottery should close at ${closingTimeDate.toLocaleDateString()} : ${closingTimeDate.toLocaleTimeString()}\n`,
    );
  }

  async displayTokenBalance() {
    const balanceBN = await this.contract_token.balanceOf(this.wallet.address);
    const balance = ethers.formatUnits(balanceBN);
    console.log(
      `The account of address ${this.wallet.address} has ${balance} GTONE\n`,
    );
  }


  async buyTokens(amount: string) {

    // Convert the Ether amount to wei
    const weiAmount = ethers.parseEther(amount.toString());
  
    // Call the purchaseTokens function and send Ether
    const purchaseTx = await this.contract.purchaseTokens(weiAmount, { value: weiAmount });
    const purchaseReceipt = await purchaseTx.wait();
  
    console.log("Transaction receipt:", purchaseReceipt);

  }

  //async bet(amount: string) {
  async bet() {
    const contractAddress = await this.contract.getAddress();
    const allowTx = await this.contract_token.approve(
      contractAddress,
      ethers.MaxUint256,
    );
    await allowTx.wait();
    
  
    const balanceBN = await this.contract_token.balanceOf(this.wallet.address);

    // Convert the amount to the same unit as balanceBN
    //const amountInWei = ethers.parseEther(amount);

    console.log("Balance:", balanceBN.toString()); // Convert balanceBN to a string
    //console.log("Bet:", amountInWei.toString()); // Convert amountInWei to a string

    console.log('Allowed', allowTx.hash);
    //const tx = await this.contract.betMany(amount);

    //const tx = await this.contract.betMany( amountInWei.toString());
    const tx = await this.contract.bet();
    const receipt = await tx.wait();
    console.log(`Bets placed (${receipt?.hash})\n`);
  }

  async closeLottery() {
    const tx = await this.contract.closeLottery();
    const receipt = await tx.wait();
    console.log(`Bets closed (${receipt?.hash})\n`);
  }

  async ownerPool() {
    const balanceBN = await this.contract.ownerPool();
    const balance = ethers.formatUnits(balanceBN);
    console.log(`The owner pool has (${balance}) Tokens \n`);
  }

  async ownerWithdraw(amount: string) {
    const tx = await this.contract.ownerWithdraw(ethers.parseUnits(amount));
    const receipt = await tx.wait();
    console.log(`Owner Withdrawned (${receipt?.hash})\n`);
  }


}