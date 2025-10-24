import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Remove,
  Visibility,
  Description,
  CloudUpload,
  CheckCircle,
  Warning,
  Delete,
} from '@mui/icons-material';
import EFileModal from './EFileModal';
import ExhibitCreatorModal from './ExhibitCreatorModal';

const MainContentArea = forwardRef((props, ref) => {
  const fileInputRef = useRef(null);
  const [processQueue, setProcessQueue] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [nextId, setNextId] = useState(1);
  const [efileModalOpen, setEfileModalOpen] = useState(false);
  const [exhibitCreatorOpen, setExhibitCreatorOpen] = useState(false);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    handleEFileClick,
  }));

  // File handling functions
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const typeMap = {
      'pdf': 'Document',
      'doc': 'Document',
      'docx': 'Document',
      'txt': 'Text',
      'rtf': 'Document',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image',
    };
    return typeMap[extension] || 'File';
  };

  const handleAddFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    
    // Simulate file processing delay
    setTimeout(() => {
      const newFiles = files.map(file => ({
        id: nextId + files.indexOf(file),
        name: file.name,
        status: 'Ready to File',
        size: formatFileSize(file.size),
        type: getFileType(file.name),
        file: file,
        uploadDate: new Date().toISOString(),
      }));

      setProcessQueue(prev => [...prev, ...newFiles]);
      setNextId(prev => prev + files.length);
      setIsUploading(false);
      setSnackbar({
        open: true,
        message: `${files.length} file(s) added to process queue`,
        severity: 'success'
      });
      
      // Reset file input
      event.target.value = '';
    }, 1000);
  };

  const handleRemoveFile = (fileId) => {
    setProcessQueue(prev => prev.filter(file => file.id !== fileId));
    setSnackbar({
      open: true,
      message: 'File removed from process queue',
      severity: 'info'
    });
  };

  const handleViewFile = (file) => {
    if (file.file) {
      // Create object URL for file preview
      const url = URL.createObjectURL(file.file);
      window.open(url, '_blank');
    } else {
      setSnackbar({
        open: true,
        message: 'File preview not available',
        severity: 'warning'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleEFileClick = () => {
    if (selectedFile) {
      setEfileModalOpen(true);
    } else {
      setSnackbar({
        open: true,
        message: 'Please select a file from the process queue first',
        severity: 'warning'
      });
    }
  };

  const handleNewComplaint = (file) => {
    console.log('New Complaint for file:', file);
    setEfileModalOpen(false); // Close the E-File modal
    setExhibitCreatorOpen(true); // Open the Exhibit Creator modal
  };

  const handleExistingCase = (file) => {
    console.log('Existing Case for file:', file);
    setSnackbar({
      open: true,
      message: `Opening existing case for ${file.name}`,
      severity: 'success'
    });
  };

  const handleBatchExisting = (file) => {
    console.log('Batch Existing for file:', file);
    setSnackbar({
      open: true,
      message: `Starting batch existing for ${file.name}`,
      severity: 'success'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ready to File':
        return <CheckCircle color="success" />;
      case 'Processing':
        return <CloudUpload color="warning" />;
      case 'Completed':
        return <CheckCircle color="success" />;
      default:
        return <Description />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready to File':
        return '#4caf50';
      case 'Processing':
        return '#ff9800';
      case 'Completed':
        return '#2196f3';
      default:
        return '#666';
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        multiple
        accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png,.gif"
        style={{ display: 'none' }}
      />
      {/* Process Queue Section */}
      <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#333',
            mb: 3,
          }}
        >
          Process Queue
        </Typography>
        
        <Paper
          sx={{
            flex: 1,
            border: '1px solid #e0e0e0',
            backgroundColor: 'white',
            overflow: 'auto',
            minHeight: 0,
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}
        >
          {processQueue.length > 0 ? (
            <List sx={{ p: 0 }}>
              {processQueue.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem
                    onClick={() => handleFileSelect(item)}
                    sx={{
                      py: 1.5,
                      px: 2,
                      cursor: 'pointer',
                      backgroundColor: selectedFile?.id === item.id ? '#e3f2fd' : 'transparent',
                      border: selectedFile?.id === item.id ? '2px solid #1976d2' : '2px solid transparent',
                      borderRadius: '8px',
                      mb: 1,
                      '&:hover': {
                        backgroundColor: selectedFile?.id === item.id ? '#e3f2fd' : '#f5f5f5',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {getStatusIcon(item.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 'medium', fontSize: '14px' }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: getStatusColor(item.status),
                              fontWeight: 'bold',
                              fontSize: '11px',
                              px: 1,
                              py: 0.5,
                              backgroundColor: `${getStatusColor(item.status)}20`,
                              borderRadius: 1,
                            }}
                          >
                            {item.status}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            {item.size}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.type}
                          </Typography>
                          {item.uploadDate && (
                            <Typography variant="caption" color="text.secondary">
                              {new Date(item.uploadDate).toLocaleDateString()}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewFile(item)}
                        sx={{ color: '#1976d2' }}
                        title="View File"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFile(item.id)}
                        sx={{ color: '#dc3545' }}
                        title="Remove File"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {index < processQueue.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'text.secondary',
              }}
            >
              <Description sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
              <Typography variant="body2">
                No files in process queue
              </Typography>
              <Typography variant="caption">
                Add files to get started
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {/* EFile Options Section */}
      <Box sx={{ 
        p: 3, 
        borderTop: '1px solid #e0e0e0', 
        backgroundColor: '#f8f9fa',
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#333',
            mb: 3,
          }}
        >
          EFile Options
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 3,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
          <Button
            variant="contained"
            startIcon={isUploading ? <CircularProgress size={18} color="inherit" /> : <Add />}
            onClick={handleAddFile}
            disabled={isUploading}
            size="large"
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: '600',
              px: 4,
              py: 1.5,
              minWidth: '140px',
              height: '48px',
              backgroundColor: '#1976d2',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                backgroundColor: '#1565c0',
                boxShadow: '0 4px 8px rgba(25, 118, 210, 0.4)',
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                backgroundColor: '#ccc',
                boxShadow: 'none',
                transform: 'none',
              },
            }}
          >
            {isUploading ? 'Adding...' : 'Add File'}
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Remove />}
            onClick={() => {
              if (processQueue.length > 0) {
                const lastFile = processQueue[processQueue.length - 1];
                handleRemoveFile(lastFile.id);
              } else {
                setSnackbar({
                  open: true,
                  message: 'No files to remove',
                  severity: 'warning'
                });
              }
            }}
            disabled={processQueue.length === 0}
            size="large"
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: '600',
              px: 4,
              py: 1.5,
              minWidth: '140px',
              height: '48px',
              borderColor: '#dc3545',
              color: '#dc3545',
              borderRadius: '8px',
              borderWidth: '2px',
              '&:hover': {
                borderColor: '#c82333',
                backgroundColor: '#f8d7da',
                transform: 'translateY(-1px)',
                boxShadow: '0 2px 4px rgba(220, 53, 69, 0.3)',
              },
              '&:disabled': {
                borderColor: '#ccc',
                color: '#ccc',
                transform: 'none',
                boxShadow: 'none',
              },
            }}
          >
            Remove File
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => {
              if (processQueue.length > 0) {
                const lastFile = processQueue[processQueue.length - 1];
                handleViewFile(lastFile);
              } else {
                setSnackbar({
                  open: true,
                  message: 'No files to view',
                  severity: 'warning'
                });
              }
            }}
            disabled={processQueue.length === 0}
            size="large"
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: '600',
              px: 4,
              py: 1.5,
              minWidth: '140px',
              height: '48px',
              borderColor: '#28a745',
              color: '#28a745',
              borderRadius: '8px',
              borderWidth: '2px',
              '&:hover': {
                borderColor: '#218838',
                backgroundColor: '#d4edda',
                transform: 'translateY(-1px)',
                boxShadow: '0 2px 4px rgba(40, 167, 69, 0.3)',
              },
              '&:disabled': {
                borderColor: '#ccc',
                color: '#ccc',
                transform: 'none',
                boxShadow: 'none',
              },
            }}
          >
            View File
          </Button>
          
          <Button
            variant="contained"
            startIcon={<CloudUpload />}
            onClick={handleEFileClick}
            disabled={!selectedFile}
            size="large"
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: '600',
              px: 4,
              py: 1.5,
              minWidth: '140px',
              height: '48px',
              backgroundColor: '#ff9800',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(255, 152, 0, 0.3)',
              '&:hover': {
                backgroundColor: '#f57c00',
                boxShadow: '0 4px 8px rgba(255, 152, 0, 0.4)',
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                backgroundColor: '#ccc',
                boxShadow: 'none',
                transform: 'none',
              },
            }}
          >
            E-File
          </Button>
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* E-File Modal */}
      <EFileModal
        open={efileModalOpen}
        onClose={() => setEfileModalOpen(false)}
        selectedFile={selectedFile}
        onNewComplaint={handleNewComplaint}
        onExistingCase={handleExistingCase}
        onBatchExisting={handleBatchExisting}
      />

      {/* Exhibit Creator Modal */}
      <ExhibitCreatorModal
        open={exhibitCreatorOpen}
        onClose={() => setExhibitCreatorOpen(false)}
        mainDocument={selectedFile}
      />
    </Box>
  );
});

export default MainContentArea;
