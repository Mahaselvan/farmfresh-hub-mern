import { useState, useEffect } from 'react';
import productService from '../services/product';
import ImageUpload from '../components/ImageUpload';

const Marketplace = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Vegetables',
    quantity: 1,
    unit: 'kg',
    isOrganic: false,
    location: '',
    imageUrl: ''
  });
  
  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, sortBy]);

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

  const filterProducts = () => {
    let filtered = [...products];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      );
    }
    
    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    setFilteredProducts(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageUpload = (imageUrl) => {
    setNewProduct({ ...newProduct, imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await productService.createProduct(newProduct);
      alert('Product added successfully!');
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: 'Vegetables',
        quantity: 1,
        unit: 'kg',
        isOrganic: false,
        location: '',
        imageUrl: ''
      });
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  const handleAddToCart = (productId) => {
    // TODO: Implement cart functionality
    alert('Added to cart! (Cart feature coming soon)');
  };

  if (loading) {
    return <div style={styles.loading}>Loading marketplace...</div>;
  }

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2>🛒 FarmFresh Marketplace</h2>
        {user && (
          <span style={styles.welcome}>
            Welcome, {user.name} ({user.role})
          </span>
        )}
      </nav>

      <div style={styles.content}>
        {/* Search & Filter Bar */}
        <div style={styles.filterBar}>
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.select}
          >
            <option value="All">All Categories</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Grains">Grains</option>
            <option value="Dairy">Dairy</option>
            <option value="Spices">Spices</option>
          </select>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          
          {user?.role === 'farmer' && (
            <button 
              onClick={() => setShowForm(!showForm)}
              style={styles.addButton}
            >
              {showForm ? 'Cancel' : '+ Add Product'}
            </button>
          )}
        </div>

        {/* Add Product Form (for farmers) */}
        {showForm && user?.role === 'farmer' && (
          <div style={styles.formCard}>
            <h3>➕ Add New Product</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGrid}>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
                
                <textarea
                  name="description"
                  placeholder="Product Description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  rows="3"
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
                  style={styles.input}
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Spices">Spices</option>
                </select>
                
                <div style={styles.quantityGroup}>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                    style={styles.smallInput}
                    min="1"
                  />
                  
                  <select
                    name="unit"
                    value={newProduct.unit}
                    onChange={handleInputChange}
                    style={styles.smallInput}
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="piece">piece</option>
                    <option value="dozen">dozen</option>
                    <option value="litre">litre</option>
                  </select>
                </div>
                
                <input
                  type="text"
                  name="location"
                  placeholder="Farm Location"
                  value={newProduct.location}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isOrganic"
                    checked={newProduct.isOrganic}
                    onChange={handleInputChange}
                    style={styles.checkbox}
                  />
                  Organic Product
                </label>
              </div>
              
              {/* Image Upload Component */}
              <div style={styles.imageSection}>
                <h4>Product Image</h4>
                <ImageUpload onUploadSuccess={handleImageUpload} />
                {newProduct.imageUrl && (
                  <p style={styles.imageUrl}>
                    ✅ Image uploaded: {newProduct.imageUrl.substring(0, 50)}...
                  </p>
                )}
              </div>
              
              <button type="submit" style={styles.submitButton}>
                Add to Marketplace
              </button>
            </form>
          </div>
        )}

        {/* Products Grid */}
        <div style={styles.productsSection}>
          <h3>
            🌿 Fresh Produce ({filteredProducts.length} products)
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </h3>
          
          {filteredProducts.length === 0 ? (
            <div style={styles.noProducts}>
              <p>No products found. {user?.role === 'farmer' && 'Add your first product!'}</p>
            </div>
          ) : (
            <div style={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <div key={product._id} style={styles.productCard}>
                  <div style={styles.productImage}>
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        style={styles.image}
                      />
                    ) : (
                      <div style={styles.noImage}>🌱</div>
                    )}
                    {product.isOrganic && (
                      <span style={styles.organicBadge}>Organic</span>
                    )}
                  </div>
                  
                  <div style={styles.productContent}>
                    <div style={styles.productHeader}>
                      <h4 style={styles.productName}>{product.name}</h4>
                      <span style={styles.productPrice}>₹{product.price}/{product.unit}</span>
                    </div>
                    
                    <p style={styles.productDescription}>{product.description}</p>
                    
                    <div style={styles.productMeta}>
                      <span style={styles.category}>{product.category}</span>
                      <span>Quantity: {product.quantity} {product.unit}</span>
                      {product.location && (
                        <span>📍 {product.location}</span>
                      )}
                    </div>
                    
                    <div style={styles.farmerInfo}>
                      <small>By: {product.farmer?.name || 'Local Farmer'}</small>
                    </div>
                    
                    <div style={styles.productActions}>
                      {user?.role === 'consumer' && (
                        <button 
                          onClick={() => handleAddToCart(product._id)}
                          style={styles.cartButton}
                        >
                          🛒 Add to Cart
                        </button>
                      )}
                      
                      {user?.role === 'farmer' && user.id === product.farmer?._id && (
                        <div style={styles.ownerActions}>
                          <button style={styles.editButton}>Edit</button>
                          <button style={styles.deleteButton}>Delete</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add comprehensive styles (too long for this message, but you have the structure)

export default Marketplace;