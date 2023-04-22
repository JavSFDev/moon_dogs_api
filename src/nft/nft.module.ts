import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CollectionEntity,
  NftEntity,
  TransactionEntity,
} from '../database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([NftEntity, CollectionEntity, TransactionEntity]),
  ],
  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
