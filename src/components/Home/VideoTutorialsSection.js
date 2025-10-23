import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VideoTutorialsSection = () => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/signup');
  };

  const tutorials = [
    {
      title: 'Microsoft Word',
      description: 'This is a video tutorial on how to use quickfile.legal to efile using Microsoft Word.',
      thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'eFile with Exhibits',
      description: 'This is a video tutorial on how to use quickfile.legal to efile Exhibits using the quickfile.legal App.',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'New Case',
      description: 'This is a video tutorial on how to use quickfile.legal Web APP to efile a new complaint.',
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  ];

  const handleVideoClick = (title) => {
    console.log(`Playing video: ${title}`);
    // Here you would typically open a video modal or navigate to a video page
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
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
          quickfile.legal in Action
        </Typography>

        <Grid container spacing={4}>
          {tutorials.map((tutorial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardMedia
                  sx={{
                    height: 250,
                    position: 'relative',
                    backgroundImage: `url(${tutorial.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  <Button
                    onClick={() => handleVideoClick(tutorial.title)}
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      backgroundColor: 'rgba(25, 118, 210, 0.9)',
                      color: 'white',
                      borderRadius: '50%',
                      width: 80,
                      height: 80,
                      minWidth: 80,
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 1)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 40 }} />
                  </Button>
                </CardMedia>
                
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      color: '#333',
                      mb: 2,
                      fontSize: '1.3rem',
                    }}
                  >
                    {tutorial.title}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#666',
                      lineHeight: 1.6,
                    }}
                  >
                    {tutorial.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Additional CTA */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography
            variant="h5"
            sx={{
              color: '#333',
              mb: 3,
              fontWeight: 'bold',
            }}
          >
            Ready to see quickfile.legal in action?
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            onClick={handleStartTrial}
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: 3,
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Start Your Free Trial
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default VideoTutorialsSection;
