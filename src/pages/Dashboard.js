import React from 'react';
import { Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import EFilingSidebar from '../components/Dashboard/EFilingSidebar';
import MainContentArea from '../components/Dashboard/MainContentArea';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ 
      display: 'flex', 
      flex: 1,
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      height: 'calc(100vh - 64px)'
    }}>
      {/* Left Sidebar */}
      <EFilingSidebar />
      
      {/* Main Content */}
      <MainContentArea />
    </Box>
  );
};

export default Dashboard;
