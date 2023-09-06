import { ApiProperty } from '@nestjs/swagger';

export class buyTokensDTO { 
  @ApiProperty({ type: String, required: true, default: 'Default Buy Amount (in ETH)' })
  amount: string;
}