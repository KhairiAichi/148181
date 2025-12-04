// src/pages/admin/index.js
import React from 'react';
import Layout from '@theme/Layout';
import Header from '../../components/Header';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminContent from '../../components/AdminContent';

export default function Admin() {
  return (
    <ProtectedRoute role="admin">
      <Layout title="Admin Dashboard">
        <Header />

        <h1 style={{ marginTop: 20, textAlign: 'center' }}>
          Espace Administrateur
        </h1>

        <AdminContent />
      </Layout>
    </ProtectedRoute>
  );
}











