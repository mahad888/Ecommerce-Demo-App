import CartItem from '../model/cartModel.js';

export const postCartItem = async (req, res) => {
  const { productId, title, price, quantity, image } = req.body;
  try {
    if (!productId || !title || !price || !quantity) {
      return res.status(400).json({ message: 'Invalid cart item data' });
    }

    // Check if item already exists
    const existing = await CartItem.findOne({ productId });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newItem = new CartItem({ productId, title, price, quantity, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item to cart', error: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await CartItem.find();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await CartItem.deleteMany({});
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear cart', error: err.message });
  }
};
