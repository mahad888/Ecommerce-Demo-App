import { useSelector, useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">
          Your Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-xl mb-4">Your cart is currently empty.</p>
            <Link
              to="/"
              className="text-green-600 font-semibold hover:underline"
            >
              Go back to shop
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row justify-between items-center border-b pb-4"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>

                  <div className="flex items-center gap-3 mt-3 md:mt-0">
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="w-8 h-8 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      className="w-8 h-8 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-lg font-semibold text-gray-700 mt-3 md:mt-0 md:ml-6">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Checkout */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-2xl font-bold text-gray-800">
                Total: ${total.toFixed(2)}
              </div>
              <button
                onClick={() => dispatch(clearCart())}
                className="mt-4 md:mt-0 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
