// FIND this line (around line 4):
import ImageUpload from '../components/ImageUpload';
// THEN FIND where it's used (around line 200):
<ImageUpload onUploadSuccess={handleImageUpload} />

// REPLACE WITH simple input:
<div style={styles.imageSection}>
  <input
    type="text"
    placeholder="Image URL (optional)"
    name="imageUrl"
    value={newProduct.imageUrl}
    onChange={handleInputChange}
    style={styles.input}
  />
</div>