import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import axios from 'axios';
import styles from './login.module.css';
import { useHistory } from '@docusaurus/router'; // ✅ استخدام useHistory

export default function Login() {
  return (
    <Layout title="Login">
      <BrowserOnly>
        {() => <LoginContent />}
      </BrowserOnly>
    </Layout>
  );
}

function LoginContent() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const history = useHistory(); // ✅ hook لتوجيه المستخدم بدون reload

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1️⃣ تسجيل الدخول للحصول على JWT
      const loginRes = await axios.post('http://localhost:3000/api/v1/login', {
        email,
        password,
      });

      const { token, user } = loginRes.data;

      if (!token) {
        setError('❌ Erreur: token manquant. Réessayez.');
        return;
      }

      // تخزين token باسم "jwt"
      localStorage.setItem('jwt', token);

      // 2️⃣ الحصول على معلومات المستخدم الكاملة (profile)
      const profileRes = await axios.get(
        `http://localhost:3000/api/v1/users/${user.id}/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const fullUser = profileRes.data;

      localStorage.setItem('user', JSON.stringify(fullUser));

      // 3️⃣ توجيه المستخدم حسب دوره باستخدام history.push
      if (fullUser.role === 'admin') history.push('/admin');
      else if (fullUser.role === 'developpeur') history.push('/dev/dashboard');
      else if (fullUser.role === 'testeur') history.push('/test/dashboard');
      else history.push('/');

    } catch (err) {
      console.error(err);
      setError('❌ Email ou mot de passe incorrect');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: 'auto' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%' }}>
          Se connecter
        </button>
      </form>
    </div>
  );
}
