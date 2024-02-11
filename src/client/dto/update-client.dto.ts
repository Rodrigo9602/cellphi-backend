import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsOptional, IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: String;      
}
