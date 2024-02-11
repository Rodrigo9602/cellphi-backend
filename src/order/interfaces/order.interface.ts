import mongoose, { Document } from 'mongoose';



export interface Order extends Document { 
    readonly description: String,
    readonly clientId: String,
    readonly userId: String,
    readonly state: {type: String, enum: ['recibida', 'en progreso', 'completada', 'rechazada'], default: 'recibida'},
    readonly service: {type: mongoose.Schema.Types.ObjectId,  ref: 'Service'} 
}