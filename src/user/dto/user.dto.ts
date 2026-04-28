export class UserDto {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  staus!: 'active' | 'inactive';
  createdAt!: Date;
}