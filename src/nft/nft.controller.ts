import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CollectionEntity,
  NftEntity,
  TransactionEntity,
} from '../database/entities';
import { NftService } from './nft.service';
import { GetHotNftParams } from './params/get-hot-nft.params';
import { GetUserNftParams } from './params/get-user-nft.params';
import { GetCollectionNftParams } from './params/get-collection-nft.params';

@ApiTags('NFT')
@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get()
  findUserNfts(
    @Query() getUserNftParams: GetUserNftParams,
  ): Promise<NftEntity[]> {
    return this.nftService.getUserNft(getUserNftParams);
  }

  @Get('hot')
  findHotNfts(@Query() getHotNftParams: GetHotNftParams): Promise<NftEntity[]> {
    return this.nftService.getNfts(getHotNftParams);
  }

  @Get('collection')
  findCollectionNfts(
    @Query() getCollectionNftParams: GetCollectionNftParams,
  ): Promise<[NftEntity[], number]> {
    return this.nftService.getCollectionNfts(getCollectionNftParams);
  }

  @Get('history/:id')
  findTransactions(@Param('id') id: string): Promise<TransactionEntity[]> {
    return this.nftService.getTransaction(id);
  }

  @Get(':id')
  findNft(@Param('id') id: string): Promise<[NftEntity, CollectionEntity]> {
    return this.nftService.getNftInfo(id);
  }
}
