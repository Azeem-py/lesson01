import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { userDataType } from './users.service';

@Controller('users') //users will be the parent route for this controller
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get() //GET users or user?role=value
  findAll(@Query('role') role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    return this.userService.findAll(role);
  }

  @Get(':id') //GET users/:id
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id); //+ is called the unary + for converting to a number
  }

  @Post() //POST /users
  create(@Body() user: userDataType) {
    return this.userService.create(user);
  }

  @Patch(':id') //PATCH /users/:id
  update(
    @Param('id') id: string,
    @Body()
    updateData: {
      name?: string;
      email?: string;
      role: 'INTERN' | 'ADMIN' | 'ENGINEER';
    },
  ) {
    return this.userService.update(+id, updateData);
  }

  @Delete(':id') //DELETE /user/:id
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
