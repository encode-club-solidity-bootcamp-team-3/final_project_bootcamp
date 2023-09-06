import { ApiProperty } from '@nestjs/swagger';

export class betDTO {
  @ApiProperty({ type: String, required: true, default: 'Default Buy Amount' })
  amount: string;
}