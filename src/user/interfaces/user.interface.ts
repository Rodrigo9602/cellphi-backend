import { Document } from 'mongoose';



export interface User extends Document { 
    readonly email: String,
    readonly name: String,
    readonly password: String,    
}