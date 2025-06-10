// backend/model/cartModel.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  image: String
}, { timestamps: true });

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
