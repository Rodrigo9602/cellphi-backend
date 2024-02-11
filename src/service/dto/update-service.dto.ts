import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?: String;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    price?: Number;
}
