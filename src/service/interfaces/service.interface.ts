import { Document } from 'mongoose';



export interface Service extends Document { 
    readonly description: String,
    readonly price: Number,
    readonly userId: String,
    readonly orderId: String,
    readonly deliveryDate: Date  
}