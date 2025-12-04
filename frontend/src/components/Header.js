// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import { FiLogOut } from 'react-icons/fi';  
import CircleProfile from './CircleProfile';

export default function Header() {
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(updatedUser);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <header style={{
      padding: "12px 20px",
      background: "#ffffff",
      borderBottom: "1px solid #ddd",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 999
    }}>

      {/* Logo */}
      <img
        src="/img/download.jpeg"
        alt= "Logo Imbus"
        style={{ height: '40px', cursor: 'pointer' }}
        onClick={() => history.push('/')}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

        {/* Profile circle */}
        <div title= "Profile" >
          <CircleProfile size={40} user={user} onClick={() => history.push('/profiles')} />
        </div>

        {/* Logout icon */}
        <div
          title= "Déconnexion"
          style={{
            cursor: "pointer",
            color: "#e74c3c",
            fontSize: "22px",
            transition: "0.2s",
          }}
          onClick={logout}
          onMouseEnter={e => e.target.style.color = "#ff4d4d"}
          onMouseLeave={e => e.target.style.color = "#e74c3c"}
        >
          <FiLogOut />
        </div>

      </div>
    </header>
  );
}
