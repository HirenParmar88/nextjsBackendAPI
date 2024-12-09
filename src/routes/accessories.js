import { Router } from "express";
import { addAccessories, deleteAccessories, getAccessories, updateAccessories } from "../controllers/accessoriesController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router=Router();

//define router
router.get('/',verifyToken, getAccessories)
router.post('/',verifyToken, addAccessories)
router.put('/',verifyToken, updateAccessories)
router.delete('/:id',verifyToken, deleteAccessories)

export default router;
