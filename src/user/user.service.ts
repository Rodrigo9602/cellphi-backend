import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';


@Injectable()
export class UserService {

  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    private mailer: MailerService,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User | ConflictException> {
    try {
      // check if user already exists on database
      const userExists = await this.userModel.exists({ email: createUserDto.email });

      if (userExists) {
        throw new ConflictException('Ya ese email se encuentra registrado');
      } else {
        // create user
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password.toString(), salt);
        const user = new this.userModel({
          ...createUserDto,
          password: hashedPassword
        });
        // save user
        return user.save();
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }


  };


  async findOne(id: string): Promise<User | ConflictException> {    
    try {
      const user = await this.userModel.findById(id);

      if (user) {
        return user;
      } else {
        throw new NotFoundException(`El usuarion con id: ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error:', error.message);
    }
  };

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: email });
      if (user) {
        return user;
      } else {
        throw new NotFoundException(`El usuario con email: ${email} no existe`);
      }
    } catch (error) {
      return null;
    }
  };

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | ConflictException> {
    try {
      if (updateUserDto.password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(updateUserDto.password.toString(), salt);    
        updateUserDto.password = hashedPassword;    
      } 
      const userUpdated = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
      if (userUpdated) {        
        return userUpdated;
      } else {
        throw new NotFoundException(`El usuario con id: ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error:', error.message);
    }
  }


  async recover(params:any): Promise<any | ConflictException> {
    
    try {
      const user = await this.userModel.findOne({email: params.email});
      
      if(user) {        
        await this.mailer.sendMail(user);
        return {
          header: 'Hemos enviado un correo a tu cuenta',
          text: 'Sigue las instrucciones señaladas'
        };
        
      } else {
        throw new NotFoundException(`El usuario con email: ${params.email} no existe`)
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error:', error.message);
    }
  }

  async changePassword(token:string, updateUserDto: UpdateUserDto) {
    try {
      const {sub} = await this.jwtService.decode(token);
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateUserDto.password.toString(), salt);    
      updateUserDto.password = hashedPassword;    
      
      const userUpdated = await this.userModel.findByIdAndUpdate(sub, {password: updateUserDto.password}, {new:true});    

      if(userUpdated) {
        return userUpdated;
      } else {
        throw new NotFoundException(`El usuario con id: ${sub} no existe`);
      }

    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error:', error.message);
    }
  }

  async remove(id: string): Promise<User | ConflictException> {
    try {
      const userDeleted = await this.userModel.findByIdAndDelete(id);
      if (userDeleted) {
        return userDeleted;
      } else {
        throw new NotFoundException(`El usuario con id: ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error:', error.message);
    }
  }
}
