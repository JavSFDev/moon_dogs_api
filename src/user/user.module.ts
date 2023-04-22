import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity, NftEntity, UserEntity } from '../database/entities';
import { WalletService } from '../shared/services/wallet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CollectionEntity, NftEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, WalletService],
})
export class UserModule {}
