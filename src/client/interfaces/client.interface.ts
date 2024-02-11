import mongoose, { Document } from 'mongoose';



export interface Client extends Document { 
    readonly name: String,
    readonly ci: String,
    readonly userId: String,
    readonly orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }]    
}