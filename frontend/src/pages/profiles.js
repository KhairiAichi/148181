import React from 'react';
import Layout from '@theme/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import Profile from '../components/Profile';

export default function Profiles() {
  return (
    <ProtectedRoute>
      <Layout title="Mon Profile">
        <Profile />
      </Layout>
    </ProtectedRoute>
  );
}
