import { PartialType } from '@nestjs/mapped-types';
import { CreateWarrantyDto } from './create-warranty.dto';

import { IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class UpdateWarrantyDto extends PartialType(CreateWarrantyDto) {
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    days?: Number;
}
