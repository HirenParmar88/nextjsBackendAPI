import express from 'express';
import { addProduct, deleteProducts, getProduct, updProduct } from '../controllers/productsController.js';
const router = express.Router();

router.get('/', getProduct)
router.post('/', addProduct)
router.put('/', updProduct)
router.delete('/', deleteProducts)

export default router;