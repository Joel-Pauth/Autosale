import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  @ApiProperty({ example: 'Juan Pérez' })
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'juan.perez@example.com' })
  email!: string;

  @IsOptional()
  @IsString()
  @Length(7, 20)
  @ApiPropertyOptional({ example: '3123456789' })
  phone?: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
