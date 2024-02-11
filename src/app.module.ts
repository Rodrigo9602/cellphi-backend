import { Module } from '@nestjs/common';


import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';
import { ServiceModule } from './service/service.module';
import { WarrantyModule } from './warranty/warranty.module';
import { MailerModule } from './mailer/mailer.module';


@Module({
  imports: [    
    AuthModule,
    UserModule,
    ProductModule,
    ClientModule,
    OrderModule,
    ServiceModule,
    WarrantyModule,
    MailerModule    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
