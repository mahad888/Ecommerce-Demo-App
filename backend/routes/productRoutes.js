import express from 'express';
import { fetchProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', fetchProducts);

export default router;
