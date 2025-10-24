import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1A2B47',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Newsletter Signup */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
              Keep up on our always evolving product features and technology.
            </Typography>
            <Typography variant="body2" paragraph sx={{ color: '#CCCCCC' }}>
              Enter your e-mail and subscribe to our newsletter.
            </Typography>
            <Box component="form" sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                placeholder="Email Address *"
                variant="outlined"
                size="small"
                sx={{ 
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#FFD700',
                    },
                    '&:hover fieldset': {
                      borderColor: '#E6C200',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FFD700',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#1A2B47 !important',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#1A2B47 !important',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#666 !important',
                    opacity: 1,
                  },
                }}
              />
              <Button variant="contained" color="primary">
                Sign up
              </Button>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ mr: 1, color: '#FFD700' }} />
              <Typography variant="body2" sx={{ color: '#CCCCCC' }}>
                290 NW 165th ST Suite M-500, Miami, FL 33169
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1, color: '#FFD700' }} />
              <Typography variant="body2" sx={{ color: '#CCCCCC' }}>(833) 657-4812</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 1, color: '#FFD700' }} />
              <Typography variant="body2" sx={{ color: '#CCCCCC' }}>sales@quickfile.legal.com</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* About Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
              About <Box component="span" sx={{ color: '#FFD700' }}>quickfile.legal</Box>
            </Typography>
            <Typography variant="body2" paragraph sx={{ color: '#CCCCCC' }}>
              quickfile.legal is a unique, one of a kind service, that eFiles with the State E-Portal 
              and eServes your service list with the required service by email. With a few mouse clicks 
              your document is completely prepared, filed and served.
            </Typography>
          </Grid>

          {/* Compatible States */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
              Compatible States
            </Typography>
            <Typography variant="body2" sx={{ color: '#CCCCCC' }}>
              California, Florida, Texas, Pennsylvania, Georgia, Illinois, Indiana, 
              Maryland, Michigan, North Carolina, Arizona***
            </Typography>
            <Typography variant="caption" sx={{ color: '#CCCCCC' }}>
              *** Coming Soon
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Bottom Links */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              <MuiLink href="#" sx={{ color: '#CCCCCC', '&:hover': { color: '#FFD700' } }} underline="hover">
                Terms of Service
              </MuiLink>
              <MuiLink href="#" sx={{ color: '#CCCCCC', '&:hover': { color: '#FFD700' } }} underline="hover">
                Privacy Policy
              </MuiLink>
              <MuiLink component={Link} to="/faq" sx={{ color: '#CCCCCC', '&:hover': { color: '#FFD700' } }} underline="hover">
                FAQ
              </MuiLink>
              <MuiLink component={Link} to="/contact" sx={{ color: '#CCCCCC', '&:hover': { color: '#FFD700' } }} underline="hover">
                Contact
              </MuiLink>
              <MuiLink component={Link} to="/signup" sx={{ color: '#CCCCCC', '&:hover': { color: '#FFD700' } }} underline="hover">
                Sign Up
              </MuiLink>
              <MuiLink component={Link} to="/login" sx={{ color: '#CCCCCC', '&:hover': { color: '#FFD700' } }} underline="hover">
                User Login
              </MuiLink>
            </Box>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" align="center">
              © Copyright - Legal Automation Systems, Inc.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
