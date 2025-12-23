// src/pages/developpeur.js
import React from 'react';
import Layout from '@theme/Layout';
import Header from '../../components/Header';
import ProtectedRoute from '../../components/ProtectedRoute';
import UserAnnonces from '../../components/UserAnnonces';
export default function Developpeur() {
  return (
    <ProtectedRoute role="developpeur">
      <Layout title="Dashboard Développeur">
        <Header />
        <UserAnnonces/>
        
      </Layout>
    </ProtectedRoute>
  );
}
