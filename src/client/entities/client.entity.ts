import * as mongoose from 'mongoose';


export const ClientSchema = new mongoose.Schema({    
    name: String,
    ci: String,
    userId: String,
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }]
}); 
