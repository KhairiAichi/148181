import React, { useState } from 'react';
import Layout from '@theme/Layout';
import axios from 'axios';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './login.module.css';
import { useHistory } from '@docusaurus/router'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3001/api/v1/login', {
        email,
        password,
      });

      const { token } = res.data;

      if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', token);
      }

      window.location.href = '/users';
    } catch (err) {
      console.error(err);
      setError('❌ Email ou mot de passe incorrect');
    }
  };

  return (
    <Layout title="Connexion">
      <BrowserOnly>
        {() => (
          <div className={styles.wrapper}>
            <div className={styles.card}>
              <h2>Connexion</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit">
                  Se connecter
                </button>
              </form>
            </div>
          </div>
        )}
      </BrowserOnly>
    </Layout>
  );
}
