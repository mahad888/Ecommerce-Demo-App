import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 p-4 flex flex-col items-center">
      <div className="w-full aspect-[4/3] overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">{product.title}</h2>
        <p className="text-lg text-blue-600 font-medium mt-1">${product.price}</p>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200"
        >
          <FaShoppingCart className="text-sm" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
