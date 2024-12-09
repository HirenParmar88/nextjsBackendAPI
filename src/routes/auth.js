//src/
import { Router } from 'express';
import login from '../controllers/loginController.js';

const router = Router();

//define routes 
//router.get('/login', login)
router.post('/login', login)
//router.post('/', logOut)


export default router;