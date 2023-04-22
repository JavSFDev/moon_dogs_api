import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../../database/entities';

export class UserInfoResponse extends PartialType(UserEntity) {}
