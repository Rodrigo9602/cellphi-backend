import { Injectable } from '@nestjs/common';
import { User } from 'src/user/interfaces/user.interface';
import { transporter } from './mailer.config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class MailerService {  

  constructor(private jwtService: JwtService) {}

  async sendMail(user:User) {    
    
    let transport = transporter;
    
    // generar el token de usuario
    const payload = { sub: user._id, username: user.name };
    const token = await this.jwtService.signAsync(payload);
    const url = `http://localhost:4200/recover/${token}`;
    const html = `
      <h1>Hola ${user.name} !</h1>
      <p style="font-size: 16px;">
        Recientemente solicitó un cambio de contraseña, si no está conciente de haber realizado la solicitud
        obvie este correo, en caso de haber solicitado el cambio de su contraseña, por favor, presione el siguiente
        botón:      
      </p>
      <button style="height: 50px; background-color: #3f8ae5; border: 1px solid transparent; outline: none;">
        <a href=${url} style="color: #fff; text-decoration: none;"> recuperar mi cuenta </a>
      </button>    
    `;

    await transport.sendMail({
      to: user.email,
      subject: `Recuperación de cuenta`,
      html: html,
    });
  }
}
