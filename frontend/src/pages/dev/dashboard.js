// src/pages/developpeur.js
import React from 'react';
import Layout from '@theme/Layout';
import Header from '../../components/Header';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Developpeur() {
  return (
    <ProtectedRoute role="developpeur">
      <Layout title="Dashboard Développeur">
        <Header />

        <h1 style={{ marginTop: 20, textAlign: 'center' }}>
          Espace Développeur
        </h1>

        <p style={{ marginTop: 10, textAlign: 'center' }}>
          ________tasks developpeur.
        </p>
      </Layout>
    </ProtectedRoute>
  );
}
