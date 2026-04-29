import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { usersDB } from './entities/user.entity';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto): UserDto {
    const maxId = Math.max(...usersDB.map((u) => u.id));
    const newUser: UserDto = {
      id: maxId + 1,
      name: createUserDto.name,
      email: createUserDto.email,
      status: 'active',
      createdAt: new Date(),
    };
    usersDB.push(newUser);
    return newUser;
  }

  findAll(): UserDto[] {
    return usersDB;
  }

  findActiveusers(): UserDto[] {
    return usersDB.filter((user) => user.status === "active");
  }

  findOne(id: number): UserDto | null {
    return usersDB.find((user) => user.id === id) ?? null;
  }

  update(id: number, updateUserDto: UpdateUserDto): UserDto | null {
    const index = usersDB.findIndex((user) => user.id === id &&  user.status ===  "active");
    if (index === -1) return null;

    const updatedUser = Object.assign(usersDB[index], updateUserDto);
    return updatedUser;
  }

  remove(id: number): UserDto | null {
    const userIndex = usersDB.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    return usersDB.splice(userIndex, 1)[0];
  }

  removeAll(): UserDto[] {
    const deletedUsers = usersDB.splice(0);
    if (deletedUsers.length === 0) return [];
    return deletedUsers;
  }
}
