import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: String,
    password: String,
},{
    timestamps: true,
});

export const modelo = model('User', UserSchema);