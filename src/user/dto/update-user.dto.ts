import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: String;  

    @IsOptional()
    @IsNotEmpty()
    @IsStrongPassword()
    password?: String; 

}
