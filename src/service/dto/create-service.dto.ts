import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateServiceDto {   

    @IsNotEmpty()
    @IsString()
    description: String;

    @IsNotEmpty()
    @IsString()
    userId: String;

    @IsNotEmpty()
    @IsString()
    orderId: String;

    @IsNotEmpty()
    @IsNumber()
    price: Number;
}
