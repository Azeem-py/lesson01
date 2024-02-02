import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './DTO/updateUser.dto';
import { CreateUserDto } from './DTO/createUser.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      email: 'example1@example.com',
      name: 'John Doe',
      role: 'INTERN',
    },
    {
      id: 2,
      email: 'example2@example.com',
      name: 'Jane Smith',
      role: 'ENGINEER',
    },
    {
      id: 3,
      email: 'example3@example.com',
      name: 'Alice Johnson',
      role: 'ADMIN',
    },
    {
      id: 4,
      email: 'example4@example.com',
      name: 'Bob Brown',
      role: 'ENGINEER',
    },
    {
      id: 5,
      email: 'example5@example.com',
      name: 'Emily Davis',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role === role);
      if (!roleArray.length)
        throw new NotFoundException('No user has the role');
      return roleArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      return user.id === id ? { ...user, ...updateUserDto } : user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
