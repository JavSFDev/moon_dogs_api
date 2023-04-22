import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CollectionEntity } from '../../database/entities';

export class GetAllCollectionResponse {
  @ApiProperty()
  @Expose()
  collections: [CollectionEntity, number][];

  @ApiProperty()
  @Expose()
  count: number;
}
