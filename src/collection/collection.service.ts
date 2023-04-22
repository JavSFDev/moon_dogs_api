import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionEntity, NftEntity } from '../database/entities';
import { GetCollectionParams } from './params/get-collection.params';
import { GetAllCollectionResponse } from './response/get-all-collection.response';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
    @InjectRepository(NftEntity)
    private nftRepository: Repository<NftEntity>,
  ) {}
  async getTopCollections(
    getCollectionParams: GetCollectionParams,
  ): Promise<[CollectionEntity[], number]> {
    return await this.collectionRepository.findAndCount({
      order: {
        volume: 'DESC',
      },
      take: getCollectionParams.limit || 12,
      skip: getCollectionParams.offset || 0,
    });
  }

  async getAllCollections(
    getCollectionParams: GetCollectionParams,
  ): Promise<GetAllCollectionResponse> {
    const collections = await this.collectionRepository.findAndCount({
      relations: {
        creator: true,
      },
      order: {
        volume: 'DESC',
      },
      take: getCollectionParams.limit || 12,
      skip: getCollectionParams.offset || 0,
    });
    const result: [CollectionEntity, number][] = [];
    for (const collection of collections[0]) {
      result.push([
        collection,
        await this.nftRepository.count({
          where: {
            collection: {
              id: collection.id,
            },
          },
        }),
      ]);
    }
    return { collections: result, count: collections[1] };
  }

  async getCollectionInfo(id: string): Promise<CollectionEntity> {
    return await this.collectionRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        likedByUsers: true,
      },
    });
  }
}
