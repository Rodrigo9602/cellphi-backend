import * as mongoose from 'mongoose';


export const ProductSchema = new mongoose.Schema({    
    name: String,
    stock: Number,
    userId: String,
    availability: Boolean,
    category: String,
    price: Number,
    registerDate: Date    
}); 
