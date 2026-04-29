import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UserDto {
  id!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  status!: 'active' | 'inactive';
  
  createdAt!: Date;
}
