import React from 'react';
import Layout from '@theme/Layout';
import Header from '../../components/Header'; 
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminAnnonces from '../../components/admin/AdminAnnonces';
 
export default function Annonces() {
  return (
    <Layout title="Admin Annonces">
      <ProtectedRoute role="admin">
        <Header />
        <h1 style={{ textAlign: 'center', marginTop: 20 }}>Liste des Annonces</h1>
        <AdminAnnonces />
      </ProtectedRoute>
    </Layout>
  );
}
