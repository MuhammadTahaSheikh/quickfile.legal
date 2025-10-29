const path = require('path');

// Document storage configuration
const DOCUMENTS_BASE_PATH = path.join(__dirname, '..', 'user-documents');

// CORS configuration
const corsOptions = {
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Type']
};

module.exports = {
  DOCUMENTS_BASE_PATH,
  corsOptions
};



