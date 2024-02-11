import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

import { IsOptional, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    availability?: String;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    stock?: number;
}
