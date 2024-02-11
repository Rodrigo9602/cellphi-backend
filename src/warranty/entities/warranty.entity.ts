import * as mongoose from 'mongoose';


export const WarrantySchema = new mongoose.Schema({
    userId: String,
    productId: {type: mongoose.Schema.Types.ObjectId,  ref: 'Product'},
    clientId: {type: mongoose.Schema.Types.ObjectId,  ref: 'Client'},
    days: Number,
    emitionDate: Date    
}); 

