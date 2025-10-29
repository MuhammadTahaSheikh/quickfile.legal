import React from 'react';
import { Box, Typography } from '@mui/material';
import { 
  Description,
  CheckCircle
} from '@mui/icons-material';

const Logo = ({ sx = {} }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        gap: 2.5,
        ...sx,
      }}
    >
      {/* Professional Logo Icon */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: '50px', sm: '55px', md: '60px' },
          height: { xs: '50px', sm: '55px', md: '60px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Clean Background Square */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 1.5,
            backgroundColor: '#1A2B47',
            boxShadow: '0 2px 8px rgba(26, 43, 71, 0.3)',
          }}
        />
        
        {/* Document Icon */}
        <Description
          sx={{
            position: 'relative',
            zIndex: 2,
            fontSize: { xs: '28px', sm: '32px', md: '36px' },
            color: '#FFD700',
          }}
        />
        
        {/* Subtle Success Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '2px', sm: '3px', md: '4px' },
            right: { xs: '2px', sm: '3px', md: '4px' },
            zIndex: 3,
            width: { xs: '14px', sm: '16px', md: '18px' },
            height: { xs: '14px', sm: '16px', md: '18px' },
            backgroundColor: '#FFD700',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #1A2B47',
          }}
        >
          <CheckCircle
            sx={{
              fontSize: { xs: '10px', sm: '12px', md: '14px' },
              color: '#1A2B47',
            }}
          />
        </Box>
      </Box>
      
      {/* Professional Typography */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: '700',
            fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2rem' },
            lineHeight: 1,
            color: 'inherit',
            letterSpacing: '-0.01em',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            '& .quickfile-text': {
              color: 'inherit',
            }
          }}
        >
          <Box component="span" className="quickfile-text">quickfile</Box>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            lineHeight: 1,
            color: 'inherit',
            ml: 0.5,
            fontWeight: '500',
            opacity: 0.8,
            letterSpacing: '0.02em',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            '& .legal-text': {
              color: 'inherit',
            }
          }}
        >
          <Box component="span" className="legal-text">.legal</Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default Logo;
