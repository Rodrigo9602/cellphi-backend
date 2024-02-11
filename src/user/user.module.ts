import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './user.providers';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    MailerService,
    ...usersProviders
  ],
  exports: [UserService]
})
export class UserModule {}
