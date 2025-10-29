const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { DOCUMENTS_BASE_PATH } = require('../config/constants');
const { getAuthenticatedUser, getUserDetails } = require('./auth');

// Ensure base directory exists
if (!fs.existsSync(DOCUMENTS_BASE_PATH)) {
  fs.mkdirSync(DOCUMENTS_BASE_PATH, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // Get user info from auth token
      const authToken = req.headers.authorization?.replace('Bearer ', '');
      
      if (!authToken) {
        return cb(null, path.join(DOCUMENTS_BASE_PATH, 'unknown'));
      }

      // Verify the token and get user info
      const { user } = await getAuthenticatedUser(authToken);
      
      if (!user) {
        return cb(null, path.join(DOCUMENTS_BASE_PATH, 'unknown'));
      }

      // Get user metadata
      const { userId } = getUserDetails(user);

      // Use unique user ID to ensure proper folder isolation
      const userFolder = path.join(DOCUMENTS_BASE_PATH, userId);
      
      if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true });
      }
      
      cb(null, userFolder);
    } catch (error) {
      console.error('Error in multer destination:', error);
      cb(null, path.join(DOCUMENTS_BASE_PATH, 'unknown'));
    }
  },
  filename: (req, file, cb) => {
    // Keep original filename with timestamp to avoid conflicts
    const timestamp = Date.now();
    const originalName = path.parse(file.originalname).name;
    const ext = path.parse(file.originalname).ext;
    cb(null, `${originalName}_${timestamp}${ext}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;

