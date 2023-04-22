import { Controller, Put } from '@nestjs/common';
import { Get } from '@nestjs/common';
import {
  Body,
  Query,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../database/entities';
import { AddressPipe } from '../shared/pipes/address.pipe';
import { SignaturePipe } from '../shared/pipes/signature.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserCollectionResponse } from './response/get-user-collection.response';
import { UserInfoResponse } from './response/user-info.response';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Query('address', AddressPipe) address: string): Promise<UserEntity> {
    return this.userService.getUserByAddress(address);
  }

  @Put()
  updateUser(
    @Query(SignaturePipe) signed: boolean,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(updateUserDto);
  }

  @Get('info')
  getUserInfo(
    @Query('address', AddressPipe) address: string,
  ): Promise<UserInfoResponse> {
    return this.userService.getUserInfo(address);
  }

  @Get('collection')
  getUserCollections(
    @Query('address', AddressPipe) address: string,
  ): Promise<GetUserCollectionResponse> {
    return this.userService.getUserCollection(address);
  }
}
