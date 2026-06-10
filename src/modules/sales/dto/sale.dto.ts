import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateSaleDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  customer_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  user_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  vehicle_id: number;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: '2026-05-25T15:00:00.000Z', required: false })
  sale_date?: Date;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ example: 15500.0 })
  total_amount: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'Efectivo' })
  payment_method: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'Completada' })
  status: string;
}

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}
