import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { GetHotNftParams } from './get-hot-nft.params';

export class GetUserNftParams extends GetHotNftParams {
  @ApiProperty()
  @Expose()
  @IsOptional()
  owner: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  isListed: boolean;
}
