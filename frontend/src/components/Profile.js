// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';
import CircleProfile from '../components/CircleProfile';
import UploadPhoto from '../components/UploadPhoto';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser?.id) {
      setUser(storedUser);
      setForm({ name: storedUser.name, email: storedUser.email, password: '' });
    }
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password || undefined,
        role: user.role
      };

      await axios.put(
        `http://localhost:3000/api/v1/users/${user.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = { ...user, name: form.name, email: form.email };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setForm(prev => ({ ...prev, password: '' }));
      setError('');
      alert(`Profil de ${updatedUser.name} mis à jour ✅`);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  if (!user)
    return (
      <Layout title="Profil">
        <p>Chargement...</p>
      </Layout>
    );

  return (
    <ProtectedRoute>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <CircleProfile user={user} size={100} />
        <h2>Bienvenue, {user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>

        <UploadPhoto user={user} setUser={setUser} />

        <h3>Mettre à jour mon profil</h3>
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mot de passe (laisser vide si inchangé)"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
