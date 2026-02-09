import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config.js';

const authenticateJWT = async (request, response, next) => {
    // 1. Get the token from cookies instead of headers
    const token = request.cookies.jwt;

    // 2. If no token, the user isn't logged in
    if (!token) {
        // For API calls, it's better to send a 401 status than a redirect
        return response.status(401).json({ message: "No token found, authorization denied" });
    }

    try {
        // 3. Verify the token using your secret
        const decoded = jwt.verify(token, SECRET);
        
        // 4. Attach the user data to the request object for use in other routes
        request.user = decoded;
        
        // 5. Move to the next function (the actual route logic)
        next();
    } catch (err) {
        console.log("JWT Verification Error:", err.message);
        return response.status(403).json({ message: "Token is not valid or expired" });
    }
}

export default authenticateJWT;