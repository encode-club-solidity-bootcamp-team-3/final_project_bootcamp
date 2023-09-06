import { ApiProperty } from '@nestjs/swagger';

export class openBetsDTO {

  @ApiProperty({ type: Number, required: true, default: "Default duration" })
  duration: string;
  @ApiProperty({ type: String, required: true, default: "Default NFT address" })
  nftAddress: string;
  @ApiProperty({ type: String, required: true, default: "Default NFT tokenID" })
  tokenID: string;
}