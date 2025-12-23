import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import axios from 'axios';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1️⃣ استدعاء API تسجيل الدخول
      const loginRes = await axios.post('http://localhost:3000/api/v1/login', {
        email,
        password,
      });

      const { token, user } = loginRes.data; // 🔹 استخدم 'token' بدل 'jwt'

      if (!token) {
        setError('❌ Login failed: no token received');
        return;
      }

      // 2️⃣ خزّن الـ token في localStorage
      localStorage.setItem('token', token);

      // 3️⃣ استدعاء الـ profile للمستخدم
      const profileRes = await axios.get(
        `http://localhost:3000/api/v1/users/${user.id}/profile`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const fullUser = profileRes.data;

      // 4️⃣ خزّن بيانات المستخدم في localStorage
      localStorage.setItem('user', JSON.stringify(fullUser));

      // 5️⃣ إعادة توجيه حسب الدور
      if (fullUser.role === 'admin') window.location.href = '/admin';
      else if (fullUser.role === 'developpeur') window.location.href = '/dev/dashboard';
      else if (fullUser.role === 'testeur') window.location.href = '/test/dashboard';
      else window.location.href = '/'; // fallback

    } catch (err) {
      console.error(err.response?.data || err);
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

