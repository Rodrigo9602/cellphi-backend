import { IsString, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    description: String;

    @IsNotEmpty()
    @IsString()
    userId: String;

    @IsNotEmpty()
    @IsString()
    clientId: String;
}
