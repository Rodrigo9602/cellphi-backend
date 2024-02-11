import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<any> {
        try {
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new NotFoundException('Usuario no encontrado');
            } else {
                const isMatch = await bcrypt.compare(pass, user.password.toString());
                if (!isMatch) {
                    throw new UnauthorizedException('Contraseña incorrecta');
                }
                const payload = { sub: user._id, username: user.name };
                return {
                    access_token: await this.jwtService.signAsync(payload),
                    id: user._id
                };
            }

        } catch (error) {
            return new UnauthorizedException('Ha ocurrido el siguiente error autenticando al usuario:', error);
        }

    }


}
