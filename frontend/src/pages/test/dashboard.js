// src/pages/testeur.js
import React from 'react';
import Layout from '@theme/Layout';
import Header from '../../components/Header';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Testeur() {
  return (
    <ProtectedRoute role="testeur">
      <Layout title="Dashboard Testeur">
        <Header />

        <h1 style={{ marginTop: 20, textAlign: 'center' }}>
          Espace Testeur
        </h1>

        <p style={{ marginTop: 10, textAlign: 'center' }}>
          ________tasks testeur.
        </p>
      </Layout>
    </ProtectedRoute>
  );
}
