import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import VideoTutorialsSection from '../components/Home/VideoTutorialsSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import NewsletterSection from '../components/Home/NewsletterSection';

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <VideoTutorialsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </Box>
  );
};

export default Home;