import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <Box>
      {/* Top Informational Section (Light Theme) */}
      <Box
        sx={{
          backgroundColor: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            QUICKFILE.LEGAL - REVOLUTIONARY LEGAL DOCUMENT MANAGEMENT
          </Typography>
          
          <Divider
            sx={{
              width: 100,
              height: 2,
              backgroundColor: '#ccc',
              mx: 'auto',
              mb: 4,
            }}
          />
          
          <Typography
            variant="body1"
            sx={{
              color: '#333',
              maxWidth: '900px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: '1.1rem',
              mb: 4,
            }}
          >
            Transform your legal practice with quickfile.legal's cutting-edge document automation platform. 
            Our intelligent system streamlines the entire eFiling process, from document preparation to 
            court submission, while ensuring complete compliance with state regulations. Experience 
            unprecedented efficiency with our AI-powered workflow that eliminates manual errors, reduces 
            processing time by 80%, and integrates seamlessly with your existing case management systems. 
            Focus on what matters most - winning cases and serving your clients.
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: '#333',
              fontWeight: 'bold',
              mb: 4,
            }}
          >
            Start Your Free Trial - No Credit Card Required
          </Typography>
        </Container>
      </Box>

      {/* Bottom Call-to-Action Section (Dark Theme with Background) */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          py: 12,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              fontSize: { xs: '2rem', md: '3.5rem' },
            }}
          >
            STREAMLINE YOUR LEGAL WORKFLOW WITH INTELLIGENT AUTOMATION
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<Star />}
            onClick={handleGetStarted}
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HeroSection;
