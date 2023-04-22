import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetCollectionNftParams {
  @ApiProperty({ description: 'Collection id', required: true })
  collectionId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  offset: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  isListed?: boolean;
}
