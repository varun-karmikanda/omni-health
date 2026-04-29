import { Allow, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class ProductDto {
  id!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsString()
  @MaxLength(255)
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsOptional()
  @IsBoolean()
  isDiscontinued!: boolean;
}
