import { Router } from 'express';
import { getUsers, addUsers, upUsers, deleteUsers } from '../controllers/userController.js';
const router = Router();
//const client = require('../../../db'); // Import the PostgreSQL pool connection

//define routes for all users
router.get('/',getUsers)
router.post('/', addUsers)
router.put('/',upUsers)
router.delete('/',deleteUsers)

export default router;