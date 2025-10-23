import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Speed,
  Gavel,
  CloudUpload,
  Email,
  CheckCircle,
  Security,
  Public,
  AttachMoney,
  Support,
} from '@mui/icons-material';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Speed sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'LIGHTNING-FAST EFILING',
      description: 'File documents with state e-portals in seconds, not hours. Our streamlined process eliminates the complexity of traditional eFiling systems and gets your documents submitted instantly.',
    },
    {
      icon: <Gavel sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'STATE COURT INTEGRATION',
      description: 'Direct integration with official state court eFiling systems. Currently supporting California, Florida, Texas, Pennsylvania, Georgia, Illinois, Indiana, Maryland, Michigan, North Carolina, and Arizona.',
    },
    {
      icon: <CloudUpload sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'SIMPLE DOCUMENT UPLOAD',
      description: 'Just drag and drop your legal documents. Our system automatically detects document types, applies proper formatting, and prepares them for court submission without any manual intervention.',
    },
    {
      icon: <Email sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'AUTOMATIC E-SERVICE',
      description: 'Once your document is filed, we automatically e-serve all parties on your service list via email. No more manual service requirements or missed deadlines.',
    },
    {
      icon: <CheckCircle sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'REAL-TIME STATUS TRACKING',
      description: 'Track your filing status in real-time. Get instant notifications when documents are accepted, rejected, or require corrections. Never wonder about your filing status again.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'SECURE & COMPLIANT',
      description: 'Bank-level security protects your sensitive legal documents. Full compliance with state court requirements and attorney-client privilege standards.',
    },
    {
      icon: <Public sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'MULTI-STATE SUPPORT',
      description: 'File in multiple states from one platform. Whether you practice in Florida, California, or Texas, quickfile.legal handles the state-specific requirements automatically.',
    },
    {
      icon: <AttachMoney sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'COST-EFFECTIVE SOLUTION',
      description: 'Save thousands on filing fees and administrative costs. Our competitive pricing and efficient process reduce your overhead while increasing your productivity.',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'DEDICATED SUPPORT',
      description: 'Get help when you need it. Our legal technology experts are available to assist with any filing questions or technical issues. We understand the legal process.',
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
            color: '#1976d2',
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          WHY CHOOSE QUICKFILE.LEGAL?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: '#666',
            mb: 6,
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          The only eFiling service that combines state court integration with automatic e-service, 
          making your legal practice more efficient and cost-effective.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  boxShadow: 'none',
                  border: '1px solid #f0f0f0',
                  borderRadius: 2,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: '#e3f2fd',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#333',
                      mb: 2,
                      fontSize: '1.1rem',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;

