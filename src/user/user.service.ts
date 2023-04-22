import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CollectionEntity, NftEntity, UserEntity } from '../database/entities';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserCollectionResponse } from './response/get-user-collection.response';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CollectionEntity)
    private collectionRepository: Repository<CollectionEntity>,
    @InjectRepository(NftEntity)
    private nftRepository: Repository<NftEntity>,
  ) {}
  async getUserByAddress(address: string) {
    const user = await this.userRepository.findOne({
      relations: {
        likedNFTs: true,
        likedCollections: true,
      },
      where: {
        address: ILike(address),
      },
    });
    if (!user) {
      return await this.userRepository.save({ address });
    }
    delete user.deletedAt;
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(updateUserDto);
  }

  async getUserInfo(address: string) {
    const user = await this.userRepository.findOne({
      where: {
        address: ILike(address),
      },
    });
    if (!user) {
      return await this.userRepository.save({ address });
    }
    delete user.email;
    delete user.likedCollections;
    delete user.likedNFTs;
    delete user.deletedAt;
    return user;
  }

  async getUserCollection(address: string): Promise<GetUserCollectionResponse> {
    const collections = await this.collectionRepository.findAndCount({
      relations: {
        creator: true,
        likedByUsers: true,
      },
      where: {
        creator: { address },
      },
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
}
