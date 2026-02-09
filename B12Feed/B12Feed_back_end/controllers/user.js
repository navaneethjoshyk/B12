import { signUpUser, findUser, verifyPassword, createAuthToken } from '../services/userService.js';

// 1. Missing export that was causing your crash
export const userSignUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        await signUpUser({ email, password });
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 2. Organization Sign Up
export const organizationSignUp = async (req, res) => {
    try {
        await signUpUser(req.body);
        res.status(201).json({ message: 'Organization created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 3. Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Attempting login for:", email);

        const user = await findUser(email);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await verifyPassword(user.password, password);
        console.log("Password Match Status:", isMatch);

        if (isMatch) {
            const token = await createAuthToken(user); // Added await just in case

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: false, // Must be false for localhost
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000 
            });

            return res.status(200).json({ 
                message: "Login successful", 
                user: { email: user.email, name: user.firstName } 
            });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};