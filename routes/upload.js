const express = require('express');
const fs = require('fs');
const path = require('path');
const { DOCUMENTS_BASE_PATH } = require('../config/constants');
const upload = require('../middleware/upload');
const { authenticate, getAuthenticatedUser, getUserDetails } = require('../middleware/auth');

const router = express.Router();

// File upload endpoint
router.post('/', upload.single('file'), async (req, res) => {
  try {
    // Verify authentication
    const authToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!authToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the token and get user info
    const { user } = await getAuthenticatedUser(authToken);
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get user metadata
    const { userName } = getUserDetails(user);

    res.json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        userName: userName
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get uploaded files for a user
router.get('/files/:userId', authenticate, async (req, res) => {
  try {
    const { userId: paramUserId } = req.params;
    const { userId: authenticatedUserId } = getUserDetails(req.user);
    
    // Ensure user can only access their own files
    if (paramUserId !== authenticatedUserId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const userFolder = path.join(DOCUMENTS_BASE_PATH, authenticatedUserId);
    
    if (!fs.existsSync(userFolder)) {
      return res.json({ files: [] });
    }

    fs.readdir(userFolder, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading user folder' });
      }
      
      // Filter out hidden files
      const filteredFiles = files.filter(file => !file.startsWith('.'));
      
      // Get file details
      const fileList = filteredFiles.map(filename => {
        const filePath = path.join(userFolder, filename);
        const stats = fs.statSync(filePath);
        return {
          filename,
          size: stats.size,
          uploadDate: stats.mtime
        };
      });

      res.json({ files: fileList });
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: error.message });
  }
});

// Download a specific file
router.get('/files/:userId/:filename', authenticate, (req, res) => {
  try {
    const { userId: paramUserId, filename } = req.params;
    const { userId: authenticatedUserId } = getUserDetails(req.user);
    
    // Ensure user can only access their own files
    if (paramUserId !== authenticatedUserId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const userFolder = path.join(DOCUMENTS_BASE_PATH, authenticatedUserId);
    const filePath = path.join(userFolder, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Send the file
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Error downloading file' });
        }
      }
    });
  } catch (error) {
    console.error('Error in download:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific file
router.delete('/files/:userId/:filename', authenticate, (req, res) => {
  try {
    const { userId: paramUserId, filename } = req.params;
    const { userId: authenticatedUserId } = getUserDetails(req.user);
    
    // Ensure user can only delete their own files
    if (paramUserId !== authenticatedUserId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const userFolder = path.join(DOCUMENTS_BASE_PATH, authenticatedUserId);
    const filePath = path.join(userFolder, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ error: 'Error deleting file' });
      }
      
      res.json({ message: 'File deleted successfully' });
    });
  } catch (error) {
    console.error('Error in delete:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

