import * as mongoose from 'mongoose';



export const OrderSchema = new mongoose.Schema({    
    description: String,
    clientId: String,
    userId: String,
    state: {type: String, enum: ['recibida', 'en progreso', 'completada', 'rechazada'], default: 'recibida'},
    service: {type: mongoose.Schema.Types.ObjectId,  ref: 'Service'}
}); 

