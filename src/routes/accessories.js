import { Router } from "express";
import { addAccessories, deleteAccessories, getAcce, updateAccessories, } from "../controllers/accessoriesController.js";

const router=Router();

//define router
router.get('/', getAcce)
router.post('/', addAccessories)
router.put('/', updateAccessories)
router.delete('/:id', deleteAccessories)

export default router;
