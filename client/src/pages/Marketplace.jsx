<div style={styles.imageSection}>
  <h4>Product Image</h4>
  <input
    type="text"
    placeholder="Image URL (optional)"
    name="imageUrl"
    value={newProduct.imageUrl}
    onChange={handleInputChange}
    style={styles.input}
  />
  <small>Enter image URL or leave blank for default</small>
</div>