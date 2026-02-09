import { User } from '../models/dbSchema.js';
import { SECRET } from '../config/config.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const signUpUser = async (userData) => {
    const { password } = userData;
    if (!password) throw new Error("No password provided for hashing");

    const hashedPassword = await argon2.hash(password);
    return User.create({ ...userData, password: hashedPassword });
};

export const findUser = async (email) => {
    // We MUST use .select('+password') because of the 'select: false' in schema
    const user = await User.findOne({ email }).select('+password');
    console.log("DB Search Result:", user ? "User Found" : "User NOT Found");
    return user;
};

export const verifyPassword = async (hashedPassword, inputPassword) => {
    if (!hashedPassword || !inputPassword) {
        console.log("Verify Error: Missing hash or input");
        return false;
    }
    return await argon2.verify(hashedPassword, inputPassword);
};

export const createAuthToken = (userInfo) => {
    return jwt.sign({ id: userInfo._id, email: userInfo.email }, SECRET, { expiresIn: '1d' });
};