import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { usersDB } from './entities/user.entity';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto): UserDto {
    const maxId = Math.max(...usersDB.map(u => u.id));
    const newUser: UserDto = {
      id: maxId + 1,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      staus: 'active',
      createdAt: new Date()
    };
    usersDB.push(newUser);
    return newUser;
  }

  findAll(): UserDto[] {
    return usersDB;
  }

  findOne(id: number): UserDto | undefined {
    return usersDB.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): UserDto | undefined {
    const userIndex = usersDB.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    usersDB[userIndex] = { ...usersDB[userIndex], ...updateUserDto };
    return usersDB[userIndex];
  }

  remove(id: number): UserDto | undefined {
    const userIndex = usersDB.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    return usersDB.splice(userIndex, 1)[0];
  }
}
