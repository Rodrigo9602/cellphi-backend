import { IsString, IsNotEmpty } from "class-validator";

export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    name: String;

    @IsNotEmpty()
    @IsString()
    ci: String;

    @IsNotEmpty()
    @IsString()
    userId: String;
};
