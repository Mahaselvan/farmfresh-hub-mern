import { useState, useEffect } from 'react';
import productService from '../services/product';

const Marketplace = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Vegetables'
  });

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login first');
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await productService.addProduct(newProduct, token);
      alert('Product added successfully!');
      setNewProduct({ name: '', price: '', category: 'Vegetables' });
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading products...</div>;
  }

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2>🛒 FarmFresh Marketplace</h2>
        <div>
          {user ? (
            <span style={styles.welcome}>Welcome, {user.name}</span>
          ) : (
            <span>Please login to add products</span>
          )}
        </div>
      </nav>

      <div style={styles.content}>
        {/* Add Product Form (for farmers) */}
        {user?.role === 'farmer' && (
          <div style={styles.formCard}>
            <h3>➕ Add New Produce</h3>
            <form onSubmit={handleAddProduct} style={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Product name (e.g., Organic Tomatoes)"
                value={newProduct.name}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price (₹)"
                value={newProduct.price}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Dairy">Dairy</option>
              </select>
              <button type="submit" style={styles.addButton}>
                Add to Marketplace
              </button>
            </form>
          </div>
        )}

        {/* Products Listing */}
        <div style={styles.productsSection}>
          <h3>🌿 Fresh Produce Available</h3>
          
          {products.length === 0 ? (
            <p style={styles.noProducts}>No products available yet.</p>
          ) : (
            <div style={styles.productsGrid}>
              {products.map((product) => (
                <div key={product._id} style={styles.productCard}>
                  <div style={styles.productHeader}>
                    <h4 style={styles.productName}>{product.name}</h4>
                    <span style={styles.productPrice}>₹{product.price}</span>
                  </div>
                  <p style={styles.productCategory}>{product.category}</p>
                  <p style={styles.productStock}>
                    {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                  </p>
                  <button style={styles.buyButton}>
                    {user?.role === 'consumer' ? 'Add to Cart' : 'View Details'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8f9fa'
  },
  navbar: {
    background: '#2d5a27',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  welcome: {
    fontSize: '14px',
    background: 'rgba(255,255,255,0.2)',
    padding: '5px 10px',
    borderRadius: '4px'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  formCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-end'
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px'
  },
  select: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    background: 'white'
  },
  addButton: {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  productsSection: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  noProducts: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '1.5rem'
  },
  productCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '1rem',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }
  },
  productHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  productName: {
    margin: 0,
    fontSize: '18px',
    color: '#333'
  },
  productPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2d5a27'
  },
  productCategory: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '0.5rem'
  },
  productStock: {
    fontSize: '14px',
    marginBottom: '1rem'
  },
  buyButton: {
    width: '100%',
    background: '#ff9800',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '18px',
    color: '#666'
  }
};

export default Marketplace;