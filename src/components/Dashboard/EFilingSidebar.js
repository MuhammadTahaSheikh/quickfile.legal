import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import {
  Person,
  CloudUpload,
  Group,
  Login,
  ExitToApp,
} from '@mui/icons-material';

const EFilingSidebar = ({ onEFileClick }) => {
  const [selectedEFiling, setSelectedEFiling] = useState('Pierre A Louis');
  const [selectedProcess, setSelectedProcess] = useState('EFile');

  // Mock data for EFiling list
  const efilingList = [
    'Pierre A Louis',
    'John Smith',
    'Jane Doe',
    'Michael Johnson',
  ];

  const processButtons = [
    { id: 'EFile', label: 'EFile', icon: <CloudUpload /> },
    { id: 'EFile with Exhibits', label: 'EFile with Exhibits', icon: <CloudUpload /> },
    { id: 'Group EFile', label: 'Group EFile', icon: <Group /> },
  ];

  // const standaloneButtons = [
  //   { id: 'E-Portal Login', label: 'E-Portal Login', icon: <Login /> },
  //   { id: 'Exit Program', label: 'Exit Program', icon: <ExitToApp /> },
  // ];

  const handleEFilingSelect = (name) => {
    setSelectedEFiling(name);
  };

  const handleProcessSelect = (process) => {
    setSelectedProcess(process);
    if (process === 'EFile' && onEFileClick) {
      onEFileClick();
    }
  };

  const handleStandaloneClick = (action) => {
    console.log(`${action} clicked`);
    // Handle standalone button clicks
  };

  return (
    <Box
      sx={{
        width: 300,
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #FFD700',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Process Section */}
      <Box sx={{ p: 3, borderBottom: '1px solid #FFD700' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#1A2B47',
            mb: 3,
          }}
        >
          Process
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {processButtons.map((button) => (
            <Button
              key={button.id}
              variant={selectedProcess === button.id ? 'contained' : 'outlined'}
              startIcon={button.icon}
              onClick={() => handleProcessSelect(button.id)}
              size="large"
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '600',
                py: 1.5,
                px: 3,
                height: '56px',
                borderRadius: '8px',
                borderColor: '#FFD700',
                color: selectedProcess === button.id ? '#1A2B47' : '#FFD700',
                backgroundColor: selectedProcess === button.id ? '#FFD700' : 'transparent',
                boxShadow: selectedProcess === button.id ? '0 2px 4px rgba(255, 215, 0, 0.3)' : 'none',
                '&:hover': {
                  backgroundColor: selectedProcess === button.id ? '#E6C200' : 'rgba(255, 215, 0, 0.1)',
                  transform: 'translateY(-1px)',
                  boxShadow: selectedProcess === button.id ? '0 4px 8px rgba(255, 215, 0, 0.4)' : '0 2px 4px rgba(255, 215, 0, 0.2)',
                },
              }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Standalone Buttons */}
      <Box sx={{ p: 3, mt: 'auto' }}>
        {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {standaloneButtons.map((button) => (
            <Button
              key={button.id}
              variant="outlined"
              startIcon={button.icon}
              onClick={() => handleStandaloneClick(button.id)}
              size="large"
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '600',
                py: 1.5,
                px: 3,
                height: '56px',
                borderRadius: '8px',
                borderColor: '#1A2B47',
                color: '#1A2B47',
                borderWidth: '2px',
                '&:hover': {
                  backgroundColor: 'rgba(26, 43, 71, 0.1)',
                  borderColor: '#0F1A2F',
                  color: '#0F1A2F',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 4px rgba(26, 43, 71, 0.2)',
                },
              }}
            >
              {button.label}
            </Button>
          ))}
        </Box> */}
      </Box>
    </Box>
  );
};

export default EFilingSidebar;
