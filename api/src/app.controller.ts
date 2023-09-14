import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { openBetsDTO } from './dtos/openBets.dto';
import { buyTokensDTO } from './dtos/buyTokens.dto';
import { betDTO } from './dtos/bet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('open-bets')
  async openBets(@Body() body: openBetsDTO) {
    console.log({ body });
    return await this.appService.openBets(
      body.duration,
      body.nftAddress,
      body.tokenID,
    );
  }

  @Post('buy-tokens')
  async buyTokens(@Body() body: buyTokensDTO) {
    console.log({ body });
    return await this.appService.buyTokens(body.amount);
  }

  @Post('bet')
  //async bet(@Body() body: betDTO) {
  async bet() {
    //console.log({ body });
    return await this.appService.bet();
  }

  @Get('check-state')
  async checkState() {
    return await this.appService.checkState();
  }

  @Get('close-lottery')
  async closeLottery() {
    return await this.appService.closeLottery();
  }

  @Get('token-balance')
  async displayTokenBalance() {
    return await this.appService.displayTokenBalance();
  }

  @Get('display-owner-pool')
  async displayOwnerPool() {
    return await this.appService.ownerPool();
  }

  @Get('claim-prize')
  async claimPrize() {
    return await this.appService.prizeWithdraw();
  }
  @Get('owner-withdraw')
  async ownerWithdraw(@Query('amount') amount: string) {
    return await this.appService.ownerWithdraw(amount);
  }
  @Get('tokens-minted/:contractAddress')
  async tokensMinted(@Param('contractAddress') contractAddress: string) {
    return this.appService.tokensMinted(contractAddress);
  }
  @Get('lottery-token-contract-info/:lotteryContractAddress')
  async lotteryTokenContractInfo(
    @Param('lotteryContractAddress') lotteryContractAddress: string,
  ) {
    return this.appService.lotteryTokenContractInfo(lotteryContractAddress);
  }
  @Get('lottery-contract-info/:lotteryContractAddress')
  async lotteryInfo(
    @Param('lotteryContractAddress') lotteryContractAddress: string,
  ) {
    return this.appService.lotteryInfo(lotteryContractAddress);
  }
}
