import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="h-64 overflow-y-auto p-4">
      <h2 className="text-xl font-semibold">Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="flex justify-between items-center my-2">
          <div>{item.title} (x{item.quantity})</div>
          <div>${item.price * item.quantity}</div>
          <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500">
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 font-bold">Total: ${total.toFixed(2)}</div>
      <button onClick={() => dispatch(clearCart())} className="mt-2 bg-gray-500 text-white px-3 py-1">
        Checkout
      </button>
    </div>
  );
};

export default Cart;
