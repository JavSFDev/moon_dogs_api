import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { TokenType } from '../../shared/enums/base.enum';
const incorrectTokenTypeMessage = `Incorrect lottery type. Possible type: ${Object.values(
  TokenType,
).join(', ')}`;

export class GetHotNftParams {
  @ApiProperty({ description: 'Collection address', required: false })
  @IsOptional()
  collection?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  offset?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  isListed?: boolean;

  @ApiProperty({ enum: TokenType, required: false })
  @IsOptional()
  @IsEnum(TokenType, { message: incorrectTokenTypeMessage })
  tokenType?: TokenType;
}
