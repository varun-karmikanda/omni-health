export class UserDto {
  id!: number;
  name!: string;
  email!: string;
  status!: 'active' | 'inactive';
  createdAt!: Date;
}
