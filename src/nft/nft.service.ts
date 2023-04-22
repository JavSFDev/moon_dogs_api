import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CollectionEntity,
  NftEntity,
  TransactionEntity,
} from '../database/entities';
import { GetHotNftParams } from './params/get-hot-nft.params';
import { GetUserNftParams } from './params/get-user-nft.params';
import { GetCollectionNftParams } from './params/get-collection-nft.params';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(NftEntity)
    private readonly nftRepository: Repository<NftEntity>,
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async getNfts(getHotNftParams: GetHotNftParams) {
    return await this.nftRepository.find({
      relations: {
        collection: true,
        likedByUsers: true,
        owner: true,
      },
      select: {
        id: true,
        price: true,
        metadataUrl: true,
        likedByUsers: true,
      },
      skip: getHotNftParams.offset || 0,
      take: getHotNftParams.limit || 6,
      where: {
        collection: {
          address: getHotNftParams.collection,
        },
        isListed: getHotNftParams.isListed || true,
      },
    });
  }

  async getUserNft(getUserNftParams: GetUserNftParams) {
    return await this.nftRepository.find({
      relations: {
        collection: true,
        likedByUsers: true,
        owner: true,
      },
      select: {
        id: true,
        price: true,
        metadataUrl: true,
        likedByUsers: true,
        isListed: true,
      },
      skip: getUserNftParams.offset || 0,
      take: getUserNftParams.limit || 12,
      where: {
        isListed: getUserNftParams.isListed,
        owner: {
          address: getUserNftParams.owner,
        },
      },
    });
  }

  async getCollectionNfts(
    getCollectionNftParams: GetCollectionNftParams,
  ): Promise<[NftEntity[], number]> {
    return await this.nftRepository.findAndCount({
      relations: {
        likedByUsers: true,
        owner: true,
      },
      skip: getCollectionNftParams.offset || 0,
      take: getCollectionNftParams.limit || 12,
      where: {
        collection: {
          id: getCollectionNftParams.collectionId,
        },
        isListed: getCollectionNftParams.isListed || false,
      },
    });
  }

  async getNftInfo(id: string): Promise<[NftEntity, CollectionEntity]> {
    const nft = await this.nftRepository.findOne({
      where: { id },
      relations: {
        collection: true,
        likedByUsers: true,
        owner: true,
      },
    });
    const collection = await this.collectionRepository.findOne({
      where: {
        id: nft.collection.id,
      },
      relations: {
        creator: true,
      },
    });
    return [nft, collection];
  }

  async getTransaction(id: string): Promise<TransactionEntity[]> {
    return await this.transactionRepository.find({
      relations: {
        from: true,
        to: true,
      },
      where: {
        nft: {
          id,
        },
      },
    });
  }
}
