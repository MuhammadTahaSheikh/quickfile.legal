import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Snackbar,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { supabase } from '../lib/supabase';
import {
  Visibility,
  VisibilityOff,
  Lock,
  Security,
} from '@mui/icons-material';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    // Check if we have a valid session for password reset
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsValidSession(true);
      } else {
        setSnackbarMessage('Invalid or expired reset link. Please request a new password reset.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    checkSession();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.password || !formData.confirmPassword) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (formData.password.length < 8) {
      setSnackbarMessage('Password must be at least 8 characters long.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setSnackbarMessage('Passwords do not match.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (error) {
        throw new Error(error.message);
      }

      setSnackbarMessage('Password updated successfully! You can now sign in with your new password.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      // Reset form
      setFormData({
        password: '',
        confirmPassword: '',
      });
      
      // Navigate to login page after a delay
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setSnackbarMessage(error.message || 'Failed to update password. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      '& fieldset': {
        borderColor: '#ddd',
      },
      '&:hover fieldset': {
        borderColor: '#FFD700',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFD700',
      },
      '& input': {
        color: '#1A2B47 !important',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#1A2B47',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#FFD700',
    },
    '& .MuiInputBase-input': {
      color: '#1A2B47 !important',
    },
    '& .MuiInputAdornment-root': {
      color: '#1A2B47',
    },
  };

  if (!isValidSession) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#1A2B47',
          color: 'white',
          py: 8,
          textAlign: 'center',
          '& .MuiTypography-root': {
            color: '#FFFFFF !important'
          }
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#FFFFFF !important' }}>
            Reset Your Password
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '600px', mx: 'auto', color: '#FFFFFF !important' }}>
            Enter your new password below to complete the reset process.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card sx={{ p: 4, border: '1px solid #FFD700' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Security sx={{ fontSize: 40, color: '#FFD700', mr: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
              New Password
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="New Password *"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              required
              sx={{ mb: 3, ...textFieldSx }}
              helperText="Password must be at least 8 characters long"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#FFD700' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#FFD700' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm New Password *"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              sx={{ mb: 3, ...textFieldSx }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#FFD700' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: '#FFD700' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{ 
                py: 1.5, 
                mb: 3,
                backgroundColor: '#FFD700',
                color: '#1A2B47',
                '&:hover': {
                  backgroundColor: '#E6C200',
                },
                '&:disabled': {
                  backgroundColor: '#ddd',
                  color: '#666',
                }
              }}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? 'Updating Password...' : 'Update Password'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="text"
                onClick={() => navigate('/login')}
                sx={{ 
                  color: '#1A2B47',
                  '&:hover': {
                    backgroundColor: 'rgba(26, 43, 71, 0.1)',
                  }
                }}
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResetPassword;

