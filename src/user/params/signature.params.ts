import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TokenType } from '../../shared/enums/base.enum';

export class SignatureParams {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  signature: TokenType;
}
