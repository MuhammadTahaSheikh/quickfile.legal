import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Stepper,
  Step,
  StepLabel,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import {
  CheckCircle,
  Security,
  Speed,
  Support,
  CloudDone,
  PersonAdd,
  Business,
  Email,
  Phone,
} from '@mui/icons-material';

const SignUp = () => {
  const { signup, isAuthenticated, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    firmName: '',
    position: '',
    state: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const steps = ['Personal Information', 'Firm Details', 'Account Setup', 'Review & Submit'];

  const benefits = [
    '2-week free trial with full access',
    'Automated eFiling and eService',
    'Batch processing capabilities',
    'Template creator and management',
    'Metadata scrubbing and compliance',
    'Integration with popular legal software',
    '24/7 technical support',
    'Regular updates and new features',
  ];

  const states = [
    'California', 'Florida', 'Texas', 'Pennsylvania', 'Georgia',
    'Illinois', 'Indiana', 'Maryland', 'Michigan', 'North Carolina', 'Arizona'
  ];

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setSnackbarMessage('Please fill in all required personal information fields.');
        setSnackbarOpen(true);
        return;
      }
    } else if (activeStep === 1) {
      if (!formData.firmName || !formData.position || !formData.state) {
        setSnackbarMessage('Please fill in all required firm details.');
        setSnackbarOpen(true);
        return;
      }
    } else if (activeStep === 2) {
      if (!formData.password || formData.password !== formData.confirmPassword) {
        setSnackbarMessage('Passwords do not match or are empty.');
        setSnackbarOpen(true);
        return;
      }
      if (formData.password.length < 8) {
        setSnackbarMessage('Password must be at least 8 characters long.');
        setSnackbarOpen(true);
        return;
      }
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      setSnackbarMessage('You must agree to the Terms of Service to continue.');
      setSnackbarOpen(true);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signup(formData);
      
      if (result.success) {
        setSnackbarMessage(result.message || 'Account created successfully! Please login with your credentials.');
        setSnackbarOpen(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          firmName: '',
          position: '',
          state: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false,
          agreeMarketing: false,
        });
        setActiveStep(0);
        
        // Check if user is already logged in (email confirmed)
        if (result.user && result.user.email_confirmed_at) {
          // User is logged in, go to dashboard
          navigate('/dashboard', { replace: true });
        } else {
          // Email confirmation required, go to login page
          navigate('/login', { replace: true });
        }
      } else {
        setSnackbarMessage(result.error || 'Signup failed. Please try again.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (!result.success) {
        setSnackbarMessage(result.error || 'Google sign-in failed. Please try again.');
        setSnackbarOpen(true);
      }
      // Note: If successful, user will be redirected automatically
    } catch (error) {
      setSnackbarMessage('An error occurred during Google sign-in. Please try again.');
      setSnackbarOpen(true);
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
    '& .MuiFormHelperText-root': {
      color: '#1A2B47 !important',
    },
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name *"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                sx={textFieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name *"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                sx={textFieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                sx={textFieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                sx={textFieldSx}
              />
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Firm/Organization Name *"
                name="firmName"
                value={formData.firmName}
                onChange={handleInputChange}
                required
                sx={textFieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Position/Title *"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                sx={textFieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Primary State *"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                SelectProps={{
                  native: true,
                }}
                required
                sx={textFieldSx}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        );
      
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                helperText="Password must be at least 8 characters long"
                sx={textFieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password *"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                sx={textFieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    sx={{ color: '#FFD700' }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>
                    I agree to the{' '}
                    <Link href="#" sx={{ color: '#FFD700', textDecoration: 'underline' }}>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" sx={{ color: '#FFD700', textDecoration: 'underline' }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onChange={handleInputChange}
                    sx={{ color: '#FFD700' }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>
                    I would like to receive marketing communications and updates about <Box component="span" sx={{ color: '#FFD700', fontWeight: 'bold' }}>quickfile.legal</Box>
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        );
      
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#1A2B47 !important' }}>
              Please review your information:
            </Typography>
            <Paper sx={{ p: 3, mb: 3, backgroundColor: '#FFFFFF', border: '1px solid #FFD700' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>Name:</Typography>
                  <Typography variant="body1" sx={{ color: '#1A2B47 !important' }}>{formData.firstName} {formData.lastName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>Email:</Typography>
                  <Typography variant="body1" sx={{ color: '#1A2B47 !important' }}>{formData.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>Firm:</Typography>
                  <Typography variant="body1" sx={{ color: '#1A2B47 !important' }}>{formData.firmName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>Position:</Typography>
                  <Typography variant="body1" sx={{ color: '#1A2B47 !important' }}>{formData.position}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>State:</Typography>
                  <Typography variant="body1" sx={{ color: '#1A2B47 !important' }}>{formData.state}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>Phone:</Typography>
                  <Typography variant="body1" sx={{ color: '#1A2B47 !important' }}>{formData.phone || 'Not provided'}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      
      default:
        return null;
    }
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
            Sign Up for <Box component="span" sx={{ color: '#FFD700 !important', fontWeight: 'bold' }}>quickfile.legal</Box>
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '600px', mx: 'auto', color: '#FFFFFF !important' }}>
            Join thousands of legal professionals who have simplified their eFiling process. 
            Start your 2-week <Box component="span" sx={{ color: '#FFD700 !important', fontWeight: 'bold' }}>FREE</Box> trial today!
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Sign Up Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 4, border: '1px solid #FFD700' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <PersonAdd sx={{ fontSize: 40, color: '#FFD700', mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                  Create Your Account
                </Typography>
              </Box>

              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel sx={{ 
                      '& .MuiStepLabel-label': {
                        color: '#1A2B47 !important',
                        '&.Mui-active': {
                          color: '#FFD700 !important',
                        },
                        '&.Mui-completed': {
                          color: '#1A2B47 !important',
                        },
                      },
                      '& .MuiStepIcon-root': {
                        color: '#ddd',
                        '&.Mui-active': {
                          color: '#FFD700',
                        },
                        '&.Mui-completed': {
                          color: '#1A2B47',
                        },
                      },
                    }}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box component="form" onSubmit={handleSubmit}>
                {renderStepContent(activeStep)}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ 
                      mr: 1,
                      color: '#1A2B47',
                      '&:hover': {
                        backgroundColor: 'rgba(26, 43, 71, 0.1)',
                      }
                    }}
                  >
                    Back
                  </Button>
                  <Box>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        sx={{ 
                          px: 4,
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
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        size="large"
                        sx={{ 
                          px: 4,
                          backgroundColor: '#FFD700',
                          color: '#1A2B47',
                          '&:hover': {
                            backgroundColor: '#E6C200',
                          }
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Benefits Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, backgroundColor: '#FFFFFF', border: '1px solid #FFD700' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                What You Get
              </Typography>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: '#FFD700' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={benefit} 
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

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                Already have an account?
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                href="/login"
                sx={{ 
                  mt: 2,
                  mb: 2,
                  borderColor: '#FFD700',
                  color: '#FFD700',
                  '&:hover': {
                    borderColor: '#E6C200',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  },
                }}
              >
                Sign In
              </Button>

              {/* <Divider sx={{ my: 2, backgroundColor: '#FFD700' }}>
                <Typography variant="body2" sx={{ color: '#1A2B47 !important', px: 2 }}>
                  OR
                </Typography>
              </Divider> */}

              {/* <Button
                variant="outlined"
                fullWidth
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                sx={{ 
                  borderColor: '#4285F4',
                  color: '#4285F4',
                  '&:hover': {
                    borderColor: '#3367D6',
                    backgroundColor: 'rgba(66, 133, 244, 0.04)',
                  },
                  '&:disabled': {
                    borderColor: '#ddd',
                    color: '#666',
                  }
                }}
                startIcon={
                  <Box
                    component="img"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDBDNS4zNzQgMCAwIDUuMzczIDAgMTJjMCA1LjMwMiAzLjQzOCA5LjggOC4yMDMgMTEuMzg3Yy42LjExMi44Mi0uMjU5LjgyLS41NzJ2LTIuMjM0Yy0zLjMzOC43MjctNC4wMzMtMS40MTYtNC4wMzMtMS40MTZjLS41NDYtMS4zODctMS4zMzMtMS43NTYtMS4zMzMtMS43NTZjLTEuMDg5LS43NDUuMDgzLS43MjkuMDgzLS43MjljMS4yMDUuMDg0IDEuODM5IDEuMjM3IDEuODM5IDEuMjM3YzEuMDcgMS44MjUgMi44MTcgMS4yOTcgMy40OTUuOTkzYzEuMDgtLjc3Mi40MTctMS4yOTUuNzYtMS41OTVjLTIuNjY1LS4zMDUtNS40NjctMS4zMzQtNS40NjctNS45MzhjMC0xLjMxMi40NjktMi4zODMgMS4yMzUtMy4yMjNjLS4xMjMtLjMwMy0uNTM1LTEuNTI0LjExNy0zLjE3NmMwIDAgMS4wMDctLjMyMiAzLjMwMSAxLjIzYy45NTYtLjI2NiAxLjk4LS4zOTkgMy0uNDA0YzEuMDIuMDA1IDIuMDQ0LjEzOCAzIC40MDRjMi4yOTEtMS41NTIgMy4yOTctMS4yMyAzLjI5Ny0xLjIzYy42NTIgMS42NTIuMjQgMi44NzMuMTE3IDMuMTc2Yy43NjYuODQgMS4yMzEgMS45MTEgMS4yMzEgMy4yMjNjMCA0LjYxLTIuODA1IDUuNjI0LTUuNDc1IDUuOTI1Yy40Mi4zNi44MSAxLjA5Ni44MSAyLjIxNnYzLjI5M2MwIC4zMTUuMTkyLjY3NC44MDEuNTU5QzIwLjU2NSAyMS43OTcgMjQgMTcuMyAyNCAxMmMwLTYuNjI3LTUuMzczLTEyLTEyLTEyeiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4K"
                      alt="Google"
                    sx={{ width: 20, height: 20 }}
                  />
                }
              >
                Continue with Google
              </Button> */}
            </Card>

            {/* Contact Info */}
            <Card sx={{ p: 3, mt: 3, backgroundColor: '#1A2B47', border: '1px solid #FFD700' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                Need Help?
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ fontSize: 20, color: '#FFD700', mr: 1 }} />
                <Typography variant="body2" sx={{ color: '#CCCCCC' }}>(833) 657-4812</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ fontSize: 20, color: '#FFD700', mr: 1 }} />
                <Typography variant="body2" sx={{ color: '#CCCCCC' }}>sales@quickfile.legal.com</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
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

export default SignUp;
