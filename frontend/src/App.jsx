import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Cart from "./pages/Cart"; // Make sure you have this component created

function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-100">
        {/* Header */}
        <header className="bg-green-700 shadow-md text-white">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide hover:opacity-90 transition">
              <Link to="/">
                Simple<span className="text-yellow-300">Store</span>
              </Link>
            </h1>
            <Link to="/cart" className="relative group">
              <FaShoppingCart className="text-2xl group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-green-700 text-white py-6 mt-10 shadow-inner">
          <div className="container mx-auto px-6 text-center text-sm md:text-base">
            © {new Date().getFullYear()} SimpleStore. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
