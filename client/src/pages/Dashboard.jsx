import { Link } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2>🌱 FarmFresh Hub</h2>
        <div style={styles.navRight}>
          <span style={styles.welcome}>
            Welcome, {user?.name} ({user?.role})
          </span>
          <button onClick={onLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </nav>
      
      <div style={styles.content}>
        <h1>Dashboard</h1>
        
        {user?.role === 'farmer' ? (
          <div style={styles.card}>
            <h3>👨‍🌾 Farmer Tools</h3>
            <p>Add your produce to the marketplace</p>
            <Link to="/marketplace">
              <button style={styles.primaryBtn}>Go to Marketplace</button>
            </Link>
          </div>
        ) : (
          <div style={styles.card}>
            <h3>🛒 Consumer Tools</h3>
            <p>Browse fresh produce from farmers</p>
            <Link to="/marketplace">
              <button style={styles.primaryBtn}>Shop Now</button>
            </Link>
          </div>
        )}
        
        <div style={styles.card}>
          <h3>📊 Quick Stats</h3>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
          <p>Member since: Today 🎉</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f9f9f9'
  },
  navbar: {
    background: '#2d5a27',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  welcome: {
    fontSize: '14px'
  },
  logoutBtn: {
    background: '#ff4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  card: {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  primaryBtn: {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '1rem'
  }
};

export default Dashboard;