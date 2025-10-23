import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  CheckCircle,
  Business,
  Security,
  Speed,
  Support,
  CloudDone,
} from '@mui/icons-material';

const About = () => {
  const benefits = [
    'Save time with automated eFiling processes',
    'Reduce errors and ensure compliance',
    'Streamline document preparation',
    'Integrate with popular legal software',
    '24/7 customer support',
    'Secure document handling',
  ];

  const states = [
    'California',
    'Florida', 
    'Texas',
    'Pennsylvania',
    'Georgia',
    'Illinois',
    'Indiana',
    'Maryland',
    'Michigan',
    'North Carolina',
    'Arizona (Coming Soon)',
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            About quickfile.legal
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Revolutionizing legal document filing with innovative technology and unmatched ease of use.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Company Overview */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Our Mission
          </Typography>
          <Paper sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6" paragraph>
              quickfile.legal is a unique, one of a kind service, that eFiles pleadings with the state eportal 
              and eServes your service list with the required service by email. With a few mouse clicks your 
              document is completely prepared, filed and served.
            </Typography>
            <Typography variant="body1" paragraph>
              We eliminate the back and forth between programs, selecting files, scanning documents multiple times, 
              typing in email addresses, and the other time wasting steps required to eFile. Our mission is to 
              help legal professionals save time, reduce mistakes, and focus on what they do best - practice law.
            </Typography>
          </Paper>
        </Box>

        {/* Key Benefits */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Why Choose quickfile.legal?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Speed sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      Speed & Efficiency
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Complete your eFiling process in seconds with our streamlined interface. 
                    No more switching between multiple applications or repeating the same steps.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Security sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      Security & Compliance
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    All documents are scrubbed of personal and embarrassing information, 
                    ensuring full compliance with court requirements and privacy standards.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Business sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      Business Integration
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Seamlessly integrates with Microsoft Word, Adobe Acrobat, WordPerfect, 
                    and Worldox. Works with any CMS to populate templates and file instantly.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Support sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      Expert Support
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Our dedicated support team is available to help you get the most out of 
                    quickfile.legal. We provide comprehensive training and ongoing assistance.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Features List */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: '#1976d2' }} />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, backgroundColor: '#e3f2fd' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Supported States
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {states.map((state, index) => (
                    <Chip
                      key={index}
                      label={state}
                      color={state.includes('Coming Soon') ? 'default' : 'primary'}
                      variant={state.includes('Coming Soon') ? 'outlined' : 'filled'}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Company Info */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            About Legal Automation Systems, Inc.
          </Typography>
          <Paper sx={{ p: 4 }}>
            <Typography variant="body1" paragraph>
              quickfile.legal is developed and maintained by Legal Automation Systems, Inc., a company 
              dedicated to revolutionizing the legal industry through innovative technology solutions. 
              We understand the challenges faced by legal professionals and have created tools that 
              simplify complex processes while maintaining the highest standards of security and compliance.
            </Typography>
            <Typography variant="body1" paragraph>
              Our team consists of experienced legal professionals and software engineers who work 
              together to create solutions that truly meet the needs of the legal community. We are 
              committed to continuous improvement and regularly update our platform with new features 
              and enhancements based on user feedback.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <CloudDone sx={{ fontSize: 30, color: '#1976d2', mr: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Trusted by thousands of legal professionals nationwide
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', backgroundColor: '#f8f9fa', p: 6, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to Transform Your eFiling Process?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Join thousands of legal professionals who have already simplified their workflow with quickfile.legal.
          </Typography>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
            Try quickfile.legal and get 2 Weeks Free
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
