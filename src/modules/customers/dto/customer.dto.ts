import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ example: 'Juan' })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ example: 'Pérez' })
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ example: '12345678-9' })
  document_number: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @ApiProperty({ example: '+503 7777-7777' })
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'juan.perez@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ example: 'Calle Falsa 123, San Salvador' })
  address: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
