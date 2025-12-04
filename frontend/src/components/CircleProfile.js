import React from 'react';
import { useHistory } from '@docusaurus/router';

export default function CircleProfile({ size = 40, onClick }) {
  const history = useHistory();
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const firstLetter = storedUser.name ? storedUser.name.charAt(0).toUpperCase() : '?';

  return (
    <div
      onClick={onClick || (() => history.push('/profiles'))}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#0d6efd',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: size / 2,
      }}
    >
      {storedUser.photo_url ? (
        <img 
          src={`http://localhost:3000/${storedUser.photo_url}`} 
          alt="Profile" 
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
        />
      ) : (
        firstLetter
      )}
    </div>
  );
}
