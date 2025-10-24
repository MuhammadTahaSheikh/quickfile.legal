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
          backgroundColor: '#1A2B47',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            About <Box component="span" sx={{ color: '#FFD700' }}>quickfile.legal</Box>
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
          <Paper sx={{ p: 4, backgroundColor: '#FFFFFF', border: '1px solid #FFD700' }}>
            <Typography variant="h6" paragraph sx={{ color: '#1A2B47' }}>
              <Box component="span" sx={{ color: '#FFD700', fontWeight: 'bold' }}>quickfile.legal</Box> is a unique, one of a kind service, that eFiles pleadings with the state eportal 
              and eServes your service list with the required service by email. With a few mouse clicks your 
              document is completely prepared, filed and served.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#666' }}>
              We eliminate the back and forth between programs, selecting files, scanning documents multiple times, 
              typing in email addresses, and the other time wasting steps required to eFile. Our mission is to 
              help legal professionals save time, reduce mistakes, and focus on what they do best - practice law.
            </Typography>
          </Paper>
        </Box>

        {/* Key Benefits */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1A2B47' }}>
            Why Choose <Box component="span" sx={{ color: '#FFD700' }}>quickfile.legal</Box>?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', p: 3, border: '1px solid #FFD700' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Speed sx={{ fontSize: 40, color: '#FFD700', mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                      Speed & Efficiency
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph sx={{ color: '#1A2B47 !important' }}>
                    Complete your eFiling process in seconds with our streamlined interface. 
                    No more switching between multiple applications or repeating the same steps.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', p: 3, border: '1px solid #FFD700' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Security sx={{ fontSize: 40, color: '#FFD700', mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                      Security & Compliance
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph sx={{ color: '#1A2B47 !important' }}>
                    All documents are scrubbed of personal and embarrassing information, 
                    ensuring full compliance with court requirements and privacy standards.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', p: 3, border: '1px solid #FFD700' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Business sx={{ fontSize: 40, color: '#FFD700', mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                      Business Integration
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph sx={{ color: '#1A2B47 !important' }}>
                    Seamlessly integrates with Microsoft Word, Adobe Acrobat, WordPerfect, 
                    and Worldox. Works with any CMS to populate templates and file instantly.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', p: 3, border: '1px solid #FFD700' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Support sx={{ fontSize: 40, color: '#FFD700', mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                      Expert Support
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph sx={{ color: '#1A2B47 !important' }}>
                    Our dedicated support team is available to help you get the most out of 
                    <Box component="span" sx={{ color: '#FFD700', fontWeight: 'bold' }}>quickfile.legal</Box>. We provide comprehensive training and ongoing assistance.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Features List */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1A2B47' }}>
            Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: '#FFD700' }} />
                    </ListItemIcon>
                    <ListItemText primary={benefit} sx={{ color: '#1A2B47' }} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, backgroundColor: '#FFFFFF', border: '1px solid #FFD700' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
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
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1A2B47' }}>
            About Legal Automation Systems, Inc.
          </Typography>
          <Paper sx={{ p: 4, backgroundColor: '#FFFFFF', border: '1px solid #FFD700' }}>
            <Typography variant="body1" paragraph sx={{ color: '#1A2B47 !important' }}>
              <Box component="span" sx={{ color: '#FFD700', fontWeight: 'bold' }}>quickfile.legal</Box> is developed and maintained by Legal Automation Systems, Inc., a company 
              dedicated to revolutionizing the legal industry through innovative technology solutions. 
              We understand the challenges faced by legal professionals and have created tools that 
              simplify complex processes while maintaining the highest standards of security and compliance.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#1A2B47 !important' }}>
              Our team consists of experienced legal professionals and software engineers who work 
              together to create solutions that truly meet the needs of the legal community. We are 
              committed to continuous improvement and regularly update our platform with new features 
              and enhancements based on user feedback.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <CloudDone sx={{ fontSize: 30, color: '#FFD700', mr: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A2B47 !important' }}>
                Trusted by thousands of legal professionals nationwide
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', backgroundColor: '#FFFFFF', p: 6, borderRadius: 2, border: '1px solid #FFD700' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47 !important' }}>
            Ready to Transform Your eFiling Process?
          </Typography>
          <Typography variant="h6" paragraph sx={{ color: '#1A2B47 !important' }}>
            Join thousands of legal professionals who have already simplified their workflow with <Box component="span" sx={{ color: '#FFD700', fontWeight: 'bold' }}>quickfile.legal</Box>.
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
            Try <Box component="span" sx={{ color: '#1A2B47' }}>quickfile.legal</Box> and get 2 Weeks <Box component="span" sx={{ color: '#FFD700' }}>FREE</Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
