import { Connection } from 'mongoose';
import { WarrantySchema } from './entities/warranty.entity';

export const warrantiesProviders = [
  {
    provide: 'WARRANTY_MODEL',
    useFactory: (connection: Connection) => connection.model('Warranty', WarrantySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];