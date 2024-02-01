import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/createUser.dto';
import { UpdateUserDto } from './DTO/updateUser.dto';

@Controller('users') //users will be the parent route for this controller
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get() //GET users or user?role=value
  findAll(@Query('role') role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    return this.userService.findAll(role);
  }

  @Get(':id') //GET users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id); //+ is called the unary + for converting to a number
  }

  @Post() //POST /users
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    // the validation pipe will validate the dto against the data coming from the user
    return this.userService.create(createUserDto);
  }

  @Patch(':id') //PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id') //DELETE /user/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
