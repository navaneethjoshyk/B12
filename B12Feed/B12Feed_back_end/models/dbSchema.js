import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, 
    firstName: String,
    lastName: String,
    orgName: String,
    orgAddress: String,
    phone: String
});

export const User = mongoose.model('User', userSchema);