
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SecureAdminAuth from '@/components/admin/SecureAdminAuth';
import SecureAdminDashboard from '@/components/admin/SecureAdminDashboard';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <SecureAdminAuth onAuthenticated={handleAuthenticated} />
      </Layout>
    );
  }

  return (
    <Layout>
      <SecureAdminDashboard />
    </Layout>
  );
};

export default AdminDashboard;
