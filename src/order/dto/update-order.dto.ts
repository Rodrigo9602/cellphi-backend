import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?: String; 

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    state?: String;
}
