import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    if (!user) throw new NotFoundException('Product creation failed');
    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`The product with id ${id} was not found`);
    }
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.userService.update(+id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`Updating the product with id ${id} failed`);
    }
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const deletedUser = this.userService.remove(+id);
    if (!deletedUser) {
      throw new NotFoundException(`Couldn't delete product with id ${id}`);
    }
    return deletedUser;
  }

  @Delete()
  removeAll() {
    return this.userService.removeAll();
  }
}
