import { CreateUserDto } from './createUser.dto';
import { PartialType } from '@nestjs/mapped-types'; //this has to be installed seperately as a dev dependency

export class UpdateUserDto extends PartialType(CreateUserDto) {}
