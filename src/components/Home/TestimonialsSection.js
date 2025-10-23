import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  Rating,
} from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Muhammad Taha',
      text: 'I am proud to say that my office now uses quickfile.legal and we are ecstatic with the amount of time that it saves by literally pressing one button and your e-filing is complete with a confirmation.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Stanley T. Padgett, Esquire',
      location: 'Tampa, FL',
      text: 'quickfile.legal is a great tool to simplify and speed up the electronic filing process and works seamlessly with Word software.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'John F. Schutz, Esq.',
      text: 'quickfile.legal, unifies and simplifies the process of eService and eFiling, saving our office from errors and freeing up more time for staff to devote to more profitable work. This program more than pays for itself, by automating a time-consuming process.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <Box sx={{ backgroundColor: 'white', py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#333',
            mb: 6,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          What our customers say about us
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  },
                  position: 'relative',
                }}
              >
                {/* Quote Icon */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    color: '#e3f2fd',
                    fontSize: 40,
                  }}
                >
                  <FormatQuote />
                </Box>

                {/* Rating */}
                <Box sx={{ mb: 3 }}>
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    size="small"
                    sx={{ color: '#ffc107' }}
                  />
                </Box>

                {/* Testimonial Text */}
                <Typography
                  variant="body1"
                  sx={{
                    color: '#333',
                    lineHeight: 1.6,
                    mb: 3,
                    fontStyle: 'italic',
                    fontSize: '1rem',
                  }}
                >
                  "{testimonial.text}"
                </Typography>

                <Divider sx={{ my: 3, backgroundColor: '#f0f0f0' }} />

                {/* Author Info */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{
                      width: 60,
                      height: 60,
                      mr: 2,
                      border: '3px solid #e3f2fd',
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '1rem',
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    {testimonial.location && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          fontSize: '0.9rem',
                        }}
                      >
                        {testimonial.location}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Additional CTA */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Paper
            sx={{
              p: 6,
              backgroundColor: '#f8f9fa',
              borderRadius: 3,
              border: '2px solid #e3f2fd',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#333',
                mb: 3,
                fontWeight: 'bold',
              }}
            >
              Join thousands of satisfied customers
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: '#666',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Experience the same time-saving benefits that our customers rave about. 
              Start your free trial today and see why quickfile.legal is the preferred 
              choice for legal professionals nationwide.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Typography
                variant="h5"
                sx={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                }}
              >
                Try quickfile.legal and get 2 Weeks Free
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
