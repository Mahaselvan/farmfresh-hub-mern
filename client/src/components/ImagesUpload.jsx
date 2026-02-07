import { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setFile(selectedFile);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image first');
      return;
    }
    
    setUploading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      
      const response = await axios.post(
        'http://localhost:5001/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      onUploadSuccess(response.data.imageUrl);
      setFile(null);
      setPreview('');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.uploadArea}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.input}
          id="image-upload"
        />
        <label htmlFor="image-upload" style={styles.label}>
          {preview ? (
            <img src={preview} alt="Preview" style={styles.preview} />
          ) : (
            <div style={styles.placeholder}>
              📷 Click to select product image
              <small style={styles.smallText}>Max 5MB</small>
            </div>
          )}
        </label>
      </div>
      
      {file && (
        <div style={styles.fileInfo}>
          <p>{file.name}</p>
          <button 
            onClick={handleUpload} 
            style={styles.uploadButton}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      )}
      
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    margin: '1rem 0'
  },
  uploadArea: {
    border: '2px dashed #ccc',
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border 0.3s'
  },
  input: {
    display: 'none'
  },
  label: {
    display: 'block',
    cursor: 'pointer'
  },
  preview: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '4px'
  },
  placeholder: {
    padding: '2rem',
    color: '#666'
  },
  smallText: {
    display: 'block',
    fontSize: '12px',
    marginTop: '5px'
  },
  fileInfo: {
    marginTop: '1rem',
    textAlign: 'center'
  },
  uploadButton: {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  error: {
    color: '#f44336',
    marginTop: '10px'
  }
};

export default ImageUpload;