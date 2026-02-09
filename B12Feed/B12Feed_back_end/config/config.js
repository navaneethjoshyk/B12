import 'dotenv/config';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_SIDE = process.env.CLIENT_SIDE || 'http://localhost:5173';

// If process.env.SECRET is missing, it will use the backup string
const SECRET = process.env.SECRET || 'BackupSecretKeyForJWTSigning';

export {
    PORT,
    MONGO_URI,
    CLIENT_SIDE,
    SECRET
}