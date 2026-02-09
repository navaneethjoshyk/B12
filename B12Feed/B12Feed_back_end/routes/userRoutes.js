import express from 'express';
import { userSignUp, loginUser, organizationSignUp } from '../controllers/user.js'; // Added organizationSignUp

const router = express.Router();

// Route for individual users joining an org
router.post('/signup', userSignUp);

// Route for creating a new organization
router.post('/signup/organization', organizationSignUp); 

// Changed to POST because sending credentials in a GET URL is insecure
router.post('/login', loginUser); 

export default router;