import { Document } from 'mongoose';



export interface Product extends Document { 
    readonly name: String,
    readonly stock: number,
    readonly userId: String,  
    readonly category: String,
    readonly price: Number,
    readonly availability: Boolean,
    readonly registerDate: Date  
}