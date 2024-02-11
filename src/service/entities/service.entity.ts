import * as mongoose from 'mongoose';


export const ServiceSchema = new mongoose.Schema({    
    userId: String,
    orderId: String,
    description: String,
    price: Number, 
    deliveryDate: Date 
}); 
