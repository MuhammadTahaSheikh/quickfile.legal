import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A2B47', // Dark navy blue from official website
      light: '#2A3B57',
      dark: '#0F1A2F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFD700', // Golden yellow from official website
      light: '#FFE55C',
      dark: '#E6C200',
      contrastText: '#1A2B47',
    },
    background: {
      default: '#1A2B47',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
    },
    grey: {
      300: '#CCCCCC', // Light gray for placeholders
      500: '#999999',
      700: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    h2: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    h3: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    h4: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    h5: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    h6: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    body1: {
      color: '#FFFFFF',
    },
    body2: {
      color: '#CCCCCC',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
        },
        contained: {
          backgroundColor: '#FFD700',
          color: '#1A2B47',
          '&:hover': {
            backgroundColor: '#E6C200',
          },
        },
        outlined: {
          borderColor: '#FFD700',
          color: '#FFD700',
          '&:hover': {
            borderColor: '#E6C200',
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A2B47',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
