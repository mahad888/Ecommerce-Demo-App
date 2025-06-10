import express from 'express';
import { postCartItem, getCart, clearCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/cart', postCartItem);
router.get('/cart', getCart);
router.delete('/cart', clearCart); // optional: to clear cart

export default router;
