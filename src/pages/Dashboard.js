import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import EFilingSidebar from '../components/Dashboard/EFilingSidebar';
import MainContentArea from '../components/Dashboard/MainContentArea';

const Dashboard = () => {
  const { user } = useAuth();
  const mainContentRef = useRef();

  const handleEFileClick = () => {
    if (mainContentRef.current) {
      mainContentRef.current.handleEFileClick();
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flex: 1,
      overflow: 'hidden',
      backgroundColor: '#1A2B47',
      height: 'calc(100vh - 64px)'
    }}>
      {/* Left Sidebar */}
      <EFilingSidebar onEFileClick={handleEFileClick} />
      
      {/* Main Content */}
      <MainContentArea ref={mainContentRef} />
    </Box>
  );
};

export default Dashboard;
