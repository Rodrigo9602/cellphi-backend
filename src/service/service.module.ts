import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { DatabaseModule } from 'src/database/database.module';
import { servicesProviders } from './service.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ServiceController],
  providers: [
    ServiceService,
    ...servicesProviders
  ],
})
export class ServiceModule {}
