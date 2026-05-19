import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  MinLength,
  IsString,
  IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSalesDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  sale_price: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  payment_method: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  customer_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  vehicle_id: number;
}

export class UpdateSalesDto extends PartialType(CreateSalesDto) {}
