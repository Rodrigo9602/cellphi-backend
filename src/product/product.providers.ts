import { Connection } from 'mongoose';
import { ProductSchema } from './entities/product.entity';

export const productsProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection: Connection) => connection.model('Product',ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];