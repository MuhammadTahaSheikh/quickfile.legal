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
        backgroundColor: '#f5f5f5',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Newsletter Signup */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Keep up on our always evolving product features and technology.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Enter your e-mail and subscribe to our newsletter.
            </Typography>
            <Box component="form" sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                placeholder="Email Address *"
                variant="outlined"
                size="small"
                sx={{ flexGrow: 1 }}
              />
              <Button variant="contained" color="primary">
                Sign up
              </Button>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">
                290 NW 165th ST Suite M-500, Miami, FL 33169
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">(833) 657-4812</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">sales@quickfile.legal.com</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* About Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              About quickfile.legal
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              quickfile.legal is a unique, one of a kind service, that eFiles with the State E-Portal 
              and eServes your service list with the required service by email. With a few mouse clicks 
              your document is completely prepared, filed and served.
            </Typography>
          </Grid>

          {/* Compatible States */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Compatible States
            </Typography>
            <Typography variant="body2" color="text.secondary">
              California, Florida, Texas, Pennsylvania, Georgia, Illinois, Indiana, 
              Maryland, Michigan, North Carolina, Arizona***
            </Typography>
            <Typography variant="caption" color="text.secondary">
              *** Coming Soon
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Bottom Links */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              <MuiLink href="#" color="text.secondary" underline="hover">
                Terms of Service
              </MuiLink>
              <MuiLink href="#" color="text.secondary" underline="hover">
                Privacy Policy
              </MuiLink>
              <MuiLink component={Link} to="/faq" color="text.secondary" underline="hover">
                FAQ
              </MuiLink>
              <MuiLink component={Link} to="/contact" color="text.secondary" underline="hover">
                Contact
              </MuiLink>
              <MuiLink component={Link} to="/signup" color="text.secondary" underline="hover">
                Sign Up
              </MuiLink>
              <MuiLink component={Link} to="/login" color="text.secondary" underline="hover">
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
