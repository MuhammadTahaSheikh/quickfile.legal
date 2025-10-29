import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
  Snackbar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Security,
  Speed,
  Support,
  CloudDone,
  Email,
  Phone,
  Lock,
} from '@mui/icons-material';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const features = [
    'Access to all quickfile.legal features',
    'Batch processing capabilities',
    'Template creator and management',
    'Automated eFiling and eService',
    'Metadata scrubbing and compliance',
    'Integration with legal software',
    '24/7 technical support',
    'Regular updates and new features',
  ];

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // COMMENTED OUT: Authentication functionality disabled - forms work silently
    return;
    
    /* ORIGINAL CODE - COMMENTED OUT
    if (!formData.email || !formData.password) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarOpen(true);
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        setSnackbarMessage('Login successful! Welcome back to quickfile.legal.');
        setSnackbarOpen(true);
        
        // Reset form
        setFormData({
          email: '',
          password: '',
          rememberMe: false,
        });
        
        // Navigate to dashboard or intended page
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setSnackbarMessage(result.error || 'Login failed. Please try again.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
    */
  };

  const handleForgotPassword = () => {
    setSnackbarMessage('Password reset instructions have been sent to your email.');
    setSnackbarOpen(true);
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
            Welcome Back
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '600px', mx: 'auto', color: '#FFFFFF !important' }}>
            Sign in to your <Box component="span" sx={{ color: '#FFD700 !important', fontWeight: 'bold' }}>quickfile.legal</Box> account to continue streamlining your eFiling process.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} justifyContent="center">
          {/* Login Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, border: '1px solid #FFD700' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <LoginIcon sx={{ fontSize: 40, color: '#FFD700', mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                  Sign In
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  sx={{ mb: 3, ...textFieldSx }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#FFD700' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Password *"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  sx={{ mb: 2, ...textFieldSx }}
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        sx={{ color: '#FFD700' }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>
                        Remember me
                      </Typography>
                    }
                  />
                  <Link
                    href="#"
                    onClick={handleForgotPassword}
                    sx={{ 
                      textDecoration: 'none',
                      color: '#FFD700',
                      '&:hover': {
                        color: '#E6C200',
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>

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
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <Divider sx={{ my: 3, '& .MuiDivider-root': { borderColor: '#FFD700' } }}>
                  <Typography variant="body2" sx={{ color: '#1A2B47 !important', px: 2 }}>
                    OR
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>
                    Don't have an account?{' '}
                    <Link href="/signup" sx={{ 
                      textDecoration: 'none', 
                      fontWeight: 'bold',
                      color: '#FFD700',
                      '&:hover': {
                        color: '#E6C200',
                        textDecoration: 'underline',
                      }
                    }}>
                      Sign up here
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Features Sidebar */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, backgroundColor: '#FFFFFF', border: '1px solid #FFD700' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                What's Inside Your Account
              </Typography>
              <List>
                {features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CloudDone sx={{ color: '#FFD700' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature} 
                      sx={{ 
                        color: '#1A2B47 !important',
                        '& .MuiListItemText-primary': {
                          color: '#1A2B47 !important',
                          fontWeight: '500',
                        }
                      }} 
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3, backgroundColor: '#FFD700' }} />

              <Paper sx={{ p: 3, backgroundColor: '#1A2B47', mb: 3, border: '1px solid #FFD700' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                  New to <Box component="span" sx={{ color: '#FFD700' }}>quickfile.legal</Box>?
                </Typography>
                <Typography variant="body2" paragraph sx={{ color: '#CCCCCC' }}>
                  Join thousands of legal professionals who have simplified their eFiling process. 
                  Start your 2-week free trial today!
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  component={Link}
                  href="/signup"
                  sx={{ 
                    mt: 2,
                    backgroundColor: '#FFD700',
                    color: '#1A2B47',
                    '&:hover': {
                      backgroundColor: '#E6C200',
                    },
                  }}
                >
                  Start Free Trial
                </Button>
              </Paper>

              {/* Contact Info */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47 !important' }}>
                  Need Help?
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone sx={{ fontSize: 20, color: '#FFD700', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>(833) 657-4812</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Email sx={{ fontSize: 20, color: '#FFD700', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>sales@quickfile.legal</Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Security Notice */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Paper sx={{ p: 4, backgroundColor: '#FFFFFF', border: '1px solid #FFD700' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Security sx={{ fontSize: 30, color: '#FFD700', mr: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                Your Security is Our Priority
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#666' }}>
              We use enterprise-grade security measures to protect your data, including encryption, 
              secure servers, and compliance with legal industry standards. Your information is 
              safe and secure with <Box component="span" sx={{ color: '#FFD700', fontWeight: 'bold' }}>quickfile.legal</Box>.
            </Typography>
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
