import { getAllProducts } from '../model/productModel.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const fetchProducts = async (req, res) => {
  try {
    const { page = 1, limit = 9, category } = req.query;
    let products = getAllProducts();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Apply category filter if provided
    if (category && category !== 'All') {
      products = products.filter(p => p.category === category);
    }

    const start = (page - 1) * limit;
    const end = start + parseInt(limit);

    const paginatedProducts = products.slice(start, end).map(product => ({
      ...product,
      // Construct full image URL
      image: `${req.protocol}://${req.get('host')}/images/${product.image}`
    }));
    
    res.status(200).json({
      total: products.length,
      page: parseInt(page),
      limit: parseInt(limit),
      hasMore: end < products.length,
      products: paginatedProducts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};