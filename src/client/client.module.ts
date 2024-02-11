import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { DatabaseModule } from 'src/database/database.module';
import { clientsProviders } from './client.providers';
import { ordersProviders } from 'src/order/order.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [
    ClientService,
    ...clientsProviders,
    ...ordersProviders
  ],  
})
export class ClientModule {}
