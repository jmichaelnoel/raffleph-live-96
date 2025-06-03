
import React, { useState } from 'react';
import SecureAdminAuth from '@/components/admin/SecureAdminAuth';
import SecureAdminDashboard from '@/components/admin/SecureAdminDashboard';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <SecureAdminAuth onAuthenticated={handleAuthenticated} />;
  }

  return <SecureAdminDashboard />;
};

export default AdminDashboard;
