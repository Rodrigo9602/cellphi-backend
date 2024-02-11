import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: String;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsNotEmpty()
    @IsString()
    userId: String;

    @IsNotEmpty()
    @IsString()
    category: String;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
