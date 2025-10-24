import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Send,
  Schedule,
  Support,
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setSnackbarOpen(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: <Phone sx={{ fontSize: 30, color: '#FFD700' }} />,
      title: 'Phone',
      details: '(833) 657-4812',
      description: 'Call us for immediate assistance',
    },
    {
      icon: <Email sx={{ fontSize: 30, color: '#FFD700' }} />,
      title: 'Email',
      details: 'sales@quickfile.legal.com',
      description: 'Send us an email anytime',
    },
    {
      icon: <LocationOn sx={{ fontSize: 30, color: '#FFD700' }} />,
      title: 'Address',
      details: '290 NW 165th ST Suite M-500, Miami, FL 33169',
      description: 'Visit our office',
    },
    {
      icon: <Schedule sx={{ fontSize: 30, color: '#FFD700' }} />,
      title: 'Business Hours',
      details: 'Monday - Friday: 9:00 AM - 6:00 PM',
      description: 'Eastern Time',
    },
  ];

  const supportTopics = [
    'General inquiries about quickfile.legal',
    'Technical support and troubleshooting',
    'Account setup and configuration',
    'Training and onboarding assistance',
    'Billing and subscription questions',
    'Feature requests and feedback',
  ];

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
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '600px', mx: 'auto', color: '#FFFFFF !important' }}>
            Get in touch with our team. We're here to help you succeed with <Box component="span" sx={{ color: '#FFD700 !important', fontWeight: 'bold' }}>quickfile.legal</Box>.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '' }}>
              Have questions about <Box component="span" sx={{ color: '#FFD700', fontWeight: 'bold' }}>quickfile.legal</Box>? Need technical support? Want to learn more about 
              our features? We're here to help! Reach out to us through any of the channels below.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 4 }}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card sx={{ 
                    height: '100%', 
                    p: 2, 
                    border: '1px solid #FFD700',
                    backgroundColor: '#FFFFFF',
                    '& .MuiTypography-root': {
                      color: '#1A2B47 !important'
                    }
                  }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Box sx={{ mb: 2 }}>
                        {info.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47 !important' }}>
                        {info.title}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1A2B47 !important' }}>
                        {info.details}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>
                        {info.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Support Topics */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                How We Can Help
              </Typography>
              <Paper sx={{ 
                p: 3, 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #FFD700',
                '& .MuiTypography-root': {
                  color: '#1A2B47 !important'
                }
              }}>
                <List>
                  {supportTopics.map((topic, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Support sx={{ color: '#FFD700' }} />
                      </ListItemIcon>
                      <ListItemText primary={topic} sx={{ color: '#1A2B47 !important' }} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 4, 
              border: '1px solid #FFD700',
              backgroundColor: '#FFFFFF',
              '& .MuiTypography-root': {
                color: '#1A2B47 !important'
              }
            }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47 !important' }}>
                Send us a Message
              </Typography>
              <Typography variant="body2" paragraph sx={{ color: '#1A2B47 !important' }}>
                Fill out the form below and we'll get back to you as soon as possible.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      sx={{
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
                        },
                        '& .MuiInputLabel-root': {
                          color: '#1A2B47',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FFD700',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      sx={{
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
                        },
                        '& .MuiInputLabel-root': {
                          color: '#1A2B47',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FFD700',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      sx={{
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
                        },
                        '& .MuiInputLabel-root': {
                          color: '#1A2B47',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FFD700',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject *"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      sx={{
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
                        },
                        '& .MuiInputLabel-root': {
                          color: '#1A2B47',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FFD700',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message *"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      sx={{
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
                        },
                        '& .MuiInputLabel-root': {
                          color: '#1A2B47',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FFD700',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{ px: 4, py: 1.5 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Information */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Paper sx={{ 
            p: 4, 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #FFD700',
            '& .MuiTypography-root': {
              color: '#1A2B47 !important'
            }
          }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47 !important' }}>
              Need Immediate Assistance?
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#1A2B47 !important' }}>
              For urgent technical issues or immediate support needs, please call us directly at 
              <Box component="span" sx={{ color: '#FFD700', fontWeight: 'bold' }}> (833) 657-4812</Box>. Our support team is available during business hours 
              to help you resolve any issues quickly.
            </Typography>
            <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>
              Average response time: Less than 2 hours during business hours
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
          Thank you for your message! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
