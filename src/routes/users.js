import { Router } from 'express';
import { getUsers, addUsers, upUsers, deleteUsers } from '../controllers/userController.js';
// 
const router = Router();

//define routes for all users
router.get('/',getUsers)
router.post('/', addUsers)
router.put('/',upUsers)
router.delete('/:id',deleteUsers)

export default router;