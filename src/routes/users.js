import { Router } from 'express';
import { getUsers, addUsers, upUsers, deleteUsers } from '../controllers/userController.js';
import verifyToken from '../middleware/authMiddleware.js';

// 
const router = Router();

//define routes for all users
router.get('/', getUsers)
router.post('/', addUsers)
// router.get('/', verifyToken, getUsers)
// router.post('/', verifyToken, addUsers)
router.put('/', verifyToken ,upUsers)
router.delete('/:id', verifyToken, deleteUsers)

export default router;