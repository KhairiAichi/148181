// src/pages/testeur.js
import React from 'react';
import Layout from '@theme/Layout';
import Header from '../../components/Header';
import ProtectedRoute from '../../components/ProtectedRoute';
import UserAnnonces from '../../components/UserAnnonces';

export default function Testeur() {
  return (
    <ProtectedRoute role="testeur">
      <Layout title="Dashboard Testeur">
        <Header />
        <UserAnnonces/>
      </Layout>
    </ProtectedRoute>
  );
}
