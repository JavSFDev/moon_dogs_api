import { Controller, Get, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { ApiTags } from '@nestjs/swagger';
import { CollectionEntity } from '../database/entities';
import { GetCollectionParams } from './params/get-collection.params';
import { GetAllCollectionResponse } from './response/get-all-collection.response';

@ApiTags('Collection')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  findAllCollections(
    @Query() getCollectionParams: GetCollectionParams,
  ): Promise<GetAllCollectionResponse> {
    return this.collectionService.getAllCollections(getCollectionParams);
  }
  @Get('top')
  findTopCollections(
    @Query() getCollectionParams: GetCollectionParams,
  ): Promise<[CollectionEntity[], number]> {
    return this.collectionService.getTopCollections(getCollectionParams);
  }

  @Get('info')
  getCollectionInfo(@Query('id') id: string): Promise<CollectionEntity> {
    return this.collectionService.getCollectionInfo(id);
  }
}
