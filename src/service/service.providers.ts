import { Connection } from 'mongoose';
import { ServiceSchema } from './entities/service.entity';


export const servicesProviders = [
  {
    provide: 'SERVICE_MODEL',
    useFactory: (connection: Connection) => connection.model('Service', ServiceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];