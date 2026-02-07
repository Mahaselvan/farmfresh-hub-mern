// client/src/components/ImageUpload.jsx - SIMPLE VERSION
const ImageUpload = ({ onUploadSuccess }) => {
  const handleClick = () => {
    // For now, just simulate upload success
    const mockUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
    onUploadSuccess(mockUrl);
  };

  return (
    <div style={{
      border: '2px dashed #ccc',
      padding: '20px',
      textAlign: 'center',
      borderRadius: '8px'
    }}>
      <p>Image upload feature coming soon!</p>
      <button 
        onClick={handleClick}
        style={{
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Use Sample Image (Demo)
      </button>
      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        Note: Cloudinary integration will be added in production
      </p>
    </div>
  );
};

export default ImageUpload;