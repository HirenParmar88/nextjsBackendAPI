import { Router } from "express";
import { addAccessories, deleteAccessories, getAccessories, updateAccessories, } from "../controllers/accessoriesController.js";

const router=Router();

//define router
router.get('/', getAccessories)
router.post('/', addAccessories)
router.put('/', updateAccessories)
router.delete('/:id', deleteAccessories)

export default router;
