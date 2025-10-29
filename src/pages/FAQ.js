import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  ExpandMore,
  Search,
  Help,
  QuestionAnswer,
  Support,
} from '@mui/icons-material';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: <Help sx={{ color: '#FFD700' }} />,
      questions: [
        {
          question: 'How do I get started with quickfile.legal?',
          answer: 'Getting started is easy! Simply sign up for an account, download our application, and follow our setup wizard. We provide comprehensive tutorials and our support team is available to help you through the process.',
        },
        {
          question: 'What are the system requirements?',
          answer: 'quickfile.legal works on Windows 10/11 and integrates with Microsoft Word, Adobe Acrobat, WordPerfect, and Worldox. You need an internet connection and a valid eFiling account with your state\'s court system.',
        },
        {
          question: 'Is there a free trial available?',
          answer: 'Yes! We offer a 2-week free trial for new users. This gives you full access to all features so you can see how quickfile.legal can streamline your workflow.',
        },
        {
          question: 'How long does setup take?',
          answer: 'Initial setup typically takes 15-30 minutes. Our automated setup wizard guides you through the process, and our support team is available if you need assistance.',
        },
      ],
    },
    {
      title: 'Features & Functionality',
      icon: <QuestionAnswer sx={{ color: '#FFD700' }} />,
      questions: [
        {
          question: 'What is batch processing?',
          answer: 'Batch processing allows you to prepare and file multiple pleadings across multiple cases simultaneously. quickfile.legal automatically splits, files, and serves each pleading individually, saving you significant time.',
        },
        {
          question: 'How does the template creator work?',
          answer: 'Our template technology lets you create, merge, and customize templates in seconds. You can integrate with any CMS to populate templates with case data and file them instantly.',
        },
        {
          question: 'What file types are supported?',
          answer: 'quickfile.legal supports PDF, DOC, DOCX, and other common legal document formats. The system automatically converts and optimizes files for eFiling compliance.',
        },
        {
          question: 'How does metadata scrubbing work?',
          answer: 'Our system automatically removes all personal and embarrassing information from documents, ensuring compliance with court requirements and protecting client privacy.',
        },
        {
          question: 'Can I use quickfile.legal with my existing case management system?',
          answer: 'Yes! quickfile.legal integrates seamlessly with most popular case management systems and legal software, including Microsoft Word, Adobe Acrobat, WordPerfect, and Worldox.',
        },
      ],
    },
    {
      title: 'Technical Support',
      icon: <Support sx={{ color: '#FFD700' }} />,
      questions: [
        {
          question: 'What if I encounter technical issues?',
          answer: 'Our technical support team is available Monday through Friday, 9 AM to 6 PM Eastern Time. You can reach us at (833) 657-4812 or email sales@quickfile.legal.com for assistance.',
        },
        {
          question: 'Do you provide training?',
          answer: 'Yes! We offer comprehensive training sessions for new users, including video tutorials, live webinars, and one-on-one training sessions with our support team.',
        },
        {
          question: 'How often is the software updated?',
          answer: 'We regularly update quickfile.legal with new features, security enhancements, and compatibility improvements. Updates are typically released monthly and are automatically installed.',
        },
        {
          question: 'Is my data secure?',
          answer: 'Absolutely. We use enterprise-grade security measures to protect your data, including encryption, secure servers, and compliance with legal industry standards.',
        },
      ],
    },
    {
      title: 'Billing & Subscription',
      icon: <Help sx={{ color: '#FFD700' }} />,
      questions: [
        {
          question: 'What are the pricing options?',
          answer: 'We offer flexible pricing plans to suit different practice sizes. Contact our sales team at (833) 657-4812 or sales@quickfile.legal.com for detailed pricing information.',
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.',
        },
        {
          question: 'Do you offer discounts for multiple users?',
          answer: 'Yes! We offer volume discounts for firms with multiple users. Contact our sales team to discuss pricing for your specific needs.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards and can also arrange invoicing for larger organizations.',
        },
      ],
    },
  ];

  const popularQuestions = [
    'How do I get started with quickfile.legal?',
    'What is batch processing?',
    'Is there a free trial available?',
    'How does metadata scrubbing work?',
    'What if I encounter technical issues?',
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#1A2B47',
          color: 'white',
          py: 8,
          textAlign: 'center',
          '& .MuiTypography-root': {
            color: '#FFFFFF !important'
          }
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#FFFFFF !important' }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '600px', mx: 'auto', color: '#FFFFFF !important' }}>
            Find answers to common questions about <Box component="span" sx={{ color: '#FFD700 !important', fontWeight: 'bold' }}>quickfile.legal</Box> and how it can streamline your eFiling process.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Search Bar */}
        <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#FFD700' }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              maxWidth: 600, 
              mx: 'auto', 
              display: 'block',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                color: '#1A2B47',
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#FFD700',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FFD700',
                },
                '& input': {
                  color: '#1A2B47 !important',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#1A2B47',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FFD700',
              },
              '& .MuiInputBase-input': {
                color: '#1A2B47 !important',
              },
            }}
          />
        </Box>

        {/* Popular Questions */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1A2B47' }}>
            Popular Questions
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {popularQuestions.map((question, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #FFD700',
                    '&:hover': { 
                      backgroundColor: '#f5f5f5',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onClick={() => setSearchTerm(question)}
                >
                  <CardContent>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1A2B47 !important' }}>
                      {question}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Search Results Indicator */}
        {searchTerm && (
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#1A2B47 !important' }}>
              Search results for: <Box component="span" sx={{ color: '#FFD700', fontWeight: 'bold' }}>"{searchTerm}"</Box>
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#1A2B47 !important', 
                cursor: 'pointer', 
                textDecoration: 'underline',
                mt: 1,
                '&:hover': {
                  color: '#FFD700 !important'
                }
              }}
              onClick={() => setSearchTerm('')}
            >
              Clear search
            </Typography>
          </Box>
        )}

        {/* FAQ Categories */}
        {filteredCategories.map((category, categoryIndex) => (
          <Box key={categoryIndex} sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {category.icon}
              <Typography variant="h4" sx={{ fontWeight: 'bold', ml: 2, color: '#1A2B47' }}>
                {category.title}
              </Typography>
            </Box>
            
            {category.questions.map((faq, faqIndex) => (
              <Accordion key={faqIndex} sx={{ 
                mb: 1,
                backgroundColor: '#FFFFFF',
                border: '1px solid #FFD700',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '0 0 8px 0',
                },
              }}>
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: '#FFD700' }} />}
                  aria-controls={`panel${categoryIndex}-${faqIndex}-content`}
                  id={`panel${categoryIndex}-${faqIndex}-header`}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0',
                    },
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A2B47 !important' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: '#FFFFFF' }}>
                  <Typography variant="body1" sx={{ color: '#1A2B47 !important', lineHeight: 1.6 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}

        {/* No Results */}
        {searchTerm && filteredCategories.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid #FFD700' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1A2B47 !important' }}>
              No results found for "{searchTerm}"
            </Typography>
            <Typography variant="body2" sx={{ color: '#1A2B47 !important' }}>
              Try searching with different keywords or browse our categories above.
            </Typography>
          </Paper>
        )}

        {/* Contact Support */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Paper sx={{ p: 4, backgroundColor: '#FFFFFF', border: '1px solid #FFD700' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1A2B47 !important' }}>
              Still Have Questions?
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#1A2B47 !important' }}>
              Can't find what you're looking for? Our support team is here to help!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                label="Call: (833) 657-4812"
                variant="outlined"
                sx={{ 
                  fontSize: '1rem', 
                  py: 2,
                  borderColor: '#FFD700',
                  color: '#1A2B47',
                  '&:hover': {
                    backgroundColor: '#FFD700',
                    color: '#1A2B47',
                  }
                }}
              />
              <Chip
                label="Email: sales@quickfile.legal.com"
                variant="outlined"
                sx={{ 
                  fontSize: '1rem', 
                  py: 2,
                  borderColor: '#FFD700',
                  color: '#1A2B47',
                  '&:hover': {
                    backgroundColor: '#FFD700',
                    color: '#1A2B47',
                  }
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
