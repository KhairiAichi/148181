import React, { useEffect, useState } from 'react';
import { Redirect } from '@docusaurus/router';

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(storedUser);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.role || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
}
