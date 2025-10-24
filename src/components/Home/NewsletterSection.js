import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { Email } from '@mui/icons-material';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter signup:', email);
      setSnackbarOpen(true);
      setEmail('');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1A2B47',
        py: 12,
        position: 'relative',
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            p: 6,
            backgroundColor: '#FFFFFF',
            borderRadius: 3,
            border: '2px solid #FFD700',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 'bold',
              color: '#1A2B47',
              mb: 3,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
            }}
          >
            Keep up on our always evolving product features and technology.
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: '#666',
              mb: 2,
              fontSize: '1.1rem',
            }}
          >
            Enter your e-mail and subscribe to our newsletter.
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: '#1A2B47',
              fontWeight: 'bold',
              mb: 4,
              fontSize: '1.2rem',
            }}
          >
            Sign up for our newsletter now!
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Email Address *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                minWidth: { xs: '100%', sm: '300px' },
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
              }}
              InputProps={{
                startAdornment: <Email sx={{ color: '#666', mr: 1 }} />,
              }}
            />
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#FFD700',
                color: '#1A2B47',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: 2,
                minWidth: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  backgroundColor: '#E6C200',
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Thank you for subscribing to our newsletter!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsletterSection;
