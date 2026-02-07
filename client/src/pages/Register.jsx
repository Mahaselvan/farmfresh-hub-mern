import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'consumer'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const res = await authService.register({ name, email, password, role });
      console.log('Registration successful:', res);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🚜 Create FarmFresh Account</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={onSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              style={styles.input}
              placeholder="Ravi Kumar"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              style={styles.input}
              placeholder="farmer@example.com"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              style={styles.input}
              minLength="6"
              placeholder="At least 6 characters"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              style={styles.input}
              placeholder="Re-enter password"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>I am a:</label>
            <select 
              name="role" 
              value={role} 
              onChange={onChange}
              style={styles.select}
            >
              <option value="consumer">Consumer (Buy produce)</option>
              <option value="farmer">Farmer (Sell produce)</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        
        <p style={styles.link}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

// Use same styles as Login page, just add select style
const styles = {
  // ... same as Login styles ...
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginTop: '5px',
    background: 'white'
  }
};

export default Register;