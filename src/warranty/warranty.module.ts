import { Module } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { WarrantyController } from './warranty.controller';
import { DatabaseModule } from 'src/database/database.module';
import { warrantiesProviders } from './warranty.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [WarrantyController],
  providers: [
    WarrantyService,
    ...warrantiesProviders
  ],
})
export class WarrantyModule {}
