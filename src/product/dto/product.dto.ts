import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class ProductDto {
  @IsNumber()
  @ApiProperty({ description: 'The unique identifier of the product', example: 1 })
  id!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({ description: 'The name of the product', example: 'Phone' })
  name!: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({ description: 'The description of the product', example: 'A high-quality smartphone' })
  description!: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'The price of the product', example: 999.99 })
  price!: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Indicates if the product is discontinued', example: false })
  isDiscontinued!: boolean;
}
