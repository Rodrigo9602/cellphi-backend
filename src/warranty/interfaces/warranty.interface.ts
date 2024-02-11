import mongoose, { Document } from 'mongoose';



export interface Warranty extends Document { 
    readonly userId: String,
    readonly productId: {type: mongoose.Schema.Types.ObjectId,  ref: 'Product'},
    readonly clientId: {type: mongoose.Schema.Types.ObjectId,  ref: 'Client'},
    readonly days: Number,
    readonly emitionDate: Date    
}