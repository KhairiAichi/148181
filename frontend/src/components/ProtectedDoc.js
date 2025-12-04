import React from 'react';
import { Redirect } from '@docusaurus/router';
import ProtectedRoute from './ProtectedRoute';

export default function ProtectedDoc({ allowedRoles = [], children }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (allowedRoles.length === 0) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
  }

  if (!user.role || !allowedRoles.includes(user.role)) {
    return <Redirect to="/docs/access-denied" />;
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
}
