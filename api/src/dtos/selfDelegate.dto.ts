import { ApiProperty } from "@nestjs/swagger";

export class DelegateVotesDto {
    @ApiProperty({ type: String, required: true, default: "My Address" })
    address: string;
}