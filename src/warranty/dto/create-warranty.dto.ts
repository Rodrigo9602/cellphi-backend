import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateWarrantyDto {
    @IsNotEmpty()
    @IsString()
    userId: String;

    @IsNotEmpty()
    @IsString()
    clientId: String;

    @IsNotEmpty()
    @IsString()
    productId: String;

    @IsNotEmpty()
    @IsNumber()
    days: Number;
}
