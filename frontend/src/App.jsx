import Home from "./pages/Home";
import { FaShoppingCart } from "react-icons/fa";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-100">
      {/* Header */}
      <header className="bg-blue-700 shadow-md text-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide hover:opacity-90 transition">
            Simple<span className="text-yellow-300">Store</span>
          </h1>
          <button className="relative group">
            <FaShoppingCart className="text-2xl group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center font-bold">
              3
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Home />
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 mt-10 shadow-inner">
        <div className="container mx-auto px-6 text-center text-sm md:text-base">
          © {new Date().getFullYear()} SimpleStore. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
