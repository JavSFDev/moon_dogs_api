import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity, NftEntity } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionEntity, NftEntity])],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
