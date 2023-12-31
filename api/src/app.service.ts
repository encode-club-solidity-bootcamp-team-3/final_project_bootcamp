import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as lotteryJson from './assets/Lottery.json';
import * as lotteryTokenJson from './assets/LotteryToken.json';
import * as nftContractJson from './assets/NFTContract.json';
import * as capybaraTokenJson from './assets/CapybaraToken.json';

// const LOTTERY_ADDRESS = '0xA2F5753e4c9077D77621364B3dD09F144A06a6C6';
// const LOTTERY_TOKEN_ADDRESS = '0x33f34416c51789e35Cd226028253b7e4C8A9efa3';
// const LOTTERY_ADDRESS = '0x80E91B9742B2874c0ab3b8d766CbE318b71335eB';
// const LOTTERY_TOKEN_ADDRESS = '0x434be57C2168C0AC839091EB79d25A7Cdbd7088D';
const LOTTERY_ADDRESS = '0xF377364D038e9053a6750392Df1734A3A6Ced2d3';
const LOTTERY_TOKEN_ADDRESS = '0xc60BFd5a59AB4fDd136B28637631947160C25B20';
const DECIMALS = 1_000_000_000_000_000_000;

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
    const tx = await this.contract.openBets(
      timestamp + Number(duration),
      nftAddress,
      tokenID,
    );
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
    const purchaseTx = await this.contract.purchaseTokens(weiAmount, {
      value: weiAmount,
    });
    const purchaseReceipt = await purchaseTx.wait();

    console.log('Transaction receipt:', purchaseReceipt);
  }

  async prizeWithdraw() {
    const tx = await this.contract.prizeWithdraw();
    const receipt = await tx.wait();
    console.log(`Prize claimed (${receipt?.hash})\n`);
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

    console.log('Balance:', balanceBN.toString()); // Convert balanceBN to a string
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

  async tokensMinted(contractAddress: string) {
    const nftContract = new ethers.Contract(
      contractAddress,
      nftContractJson.abi,
      this.provider,
    );
    const filter = nftContract.filters.Transfer;
    const events = await nftContract.queryFilter(filter, 0);
    const ADDRESS_0 = '0x0000000000000000000000000000000000000000';

    const tokenIds = events
      // topics = [?, from, to, tokenId]
      .filter((event) => `0x${event.topics[1].slice(-40)}` === ADDRESS_0)
      .map((event) => Number(event.topics[3]));

    return await Promise.all(
      tokenIds.map(async (tokenId) => {
        const tokenUri = await nftContract.tokenURI(tokenId);
        const ipfsUrl = `https://ipfs.io/ipfs/${tokenUri.split('//')[1]}`;
        return { tokenId, ipfsUrl };
      }),
    );
  }

  async lotteryTokenContractInfo(lotteryContractAddress: string) {
    const lotteryContract = new ethers.Contract(
      lotteryContractAddress,
      lotteryJson.abi,
      this.provider,
    );
    const purchaseRatio = await lotteryContract.purchaseRatio();

    const paymentTokenAddress = await lotteryContract.paymentToken();

    const lotteryTokenContract = new ethers.Contract(
      paymentTokenAddress,
      lotteryTokenJson.abi,
      this.provider,
    );

    const paymentTokenName = await lotteryTokenContract.name();
    const paymentTokenSymbol = await lotteryTokenContract.symbol();
    const paymentTokenTotalSupply = await lotteryTokenContract.totalSupply();

    // console.log('🔥', {
    //   paymentTokenAddress,
    //   purchaseRatio,
    //   paymentTokenName,
    //   paymentTokenSymbol,
    //   paymentTokenTotalSupply: Number(paymentTokenTotalSupply),
    // });
    return {
      address: paymentTokenAddress,
      ratio: Number(purchaseRatio),
      name: paymentTokenName,
      symbol: `$${paymentTokenSymbol}`,
      totalSupply: Number(paymentTokenTotalSupply) / DECIMALS,
    };
  }

  async lotteryInfo(lotteryContractAddress: string) {
    const lotteryContract = new ethers.Contract(
      lotteryContractAddress,
      lotteryJson.abi,
      this.provider,
    );

    const betsOpen = await lotteryContract.betsOpen();
    const betsClosingTime = await lotteryContract.betsClosingTime();
    const betPrice = await lotteryContract.betPrice();
    const betFee = await lotteryContract.betFee();

    const nftAddress = await lotteryContract.nftAddress();
    const nftTokenId = await lotteryContract.nftTokenId();
    const prizePool = await lotteryContract.prizePool();
    const ownerPool = await lotteryContract.ownerPool();

    const capybaraTokenContract = new ethers.Contract(
      nftAddress,
      capybaraTokenJson.abi,
      this.provider,
    );

    const tokenUri = await capybaraTokenContract.tokenURI(nftTokenId);
    const ipfsUrl = tokenUri
      ? `https://ipfs.io/ipfs/${tokenUri.split('//')[1]}`
      : null;

    return {
      ownerPool: Number(ownerPool),
      prizePool: Number(prizePool),
      betPrice: Number(betPrice),
      betFee: Number(betFee),
      status: {
        betsOpen,
        betsClosingTime: Number(betsClosingTime),
      },
      prize: {
        nftAddress,
        token: {
          tokenId: Number(nftTokenId),
          ipfsUrl,
        },
      },
    };
  }
}
