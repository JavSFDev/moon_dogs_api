import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  ADDRESS_LENGTH,
  MAX_BIO_LENGTH,
  MAX_NAME_LENGTH,
} from '../../shared/constants/user.constants';
export class UpdateUserDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @MaxLength(ADDRESS_LENGTH, {
    message:
      'Address is too long. It should be $constraint1 characters, but actual is $value',
  })
  address: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  title: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @MaxLength(MAX_BIO_LENGTH, {
    message:
      'Address is too long. It should be $constraint1 characters, but actual is $value',
  })
  bio: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @MaxLength(MAX_NAME_LENGTH, {
    message:
      'Address is too long. It should be $constraint1 characters, but actual is $value',
  })
  name: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  profileImage: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  bannerImage: string;
}
