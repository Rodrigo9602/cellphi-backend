import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/public/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }   

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Public()
  @Get('')
  findByEmail(@Body() email: string) {
    return this.userService.findByEmail(email);
  }

  @Public()
  @Post('recover')
  recover(@Body() params:any) {
    return this.userService.recover(params);
  }
  
  @Public()
  @Patch('changePassword/:token')
  changePassword(@Param('token') token: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.changePassword(token, updateUserDto);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
