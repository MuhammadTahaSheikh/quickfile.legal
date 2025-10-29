import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Close,
  Description,
  CloudUpload,
  Group,
  Add,
} from '@mui/icons-material';

const EFileModal = ({ open, onClose, selectedFile, onNewComplaint, onExistingCase, onBatchExisting }) => {
  const handleNewComplaint = () => {
    onNewComplaint(selectedFile);
    onClose();
  };

  const handleExistingCase = () => {
    onExistingCase(selectedFile);
    onClose();
  };

  const handleBatchExisting = () => {
    onBatchExisting(selectedFile);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          minHeight: '300px',
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
          px: 3,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CloudUpload sx={{ color: '#1976d2', fontSize: 24 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#333',
            }}
          >
            E-File Options
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: '#666',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              color: '#333',
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            eFileMadeEasy has detected that this file needs to be processed and efiled. 
            Please choose your preferred filing method:
          </Typography>
          
          {selectedFile && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}
            >
              <Description sx={{ color: '#1976d2', fontSize: 32 }} />
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: '600',
                    color: '#333',
                    fontSize: '14px',
                  }}
                >
                  {selectedFile.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#666',
                    fontSize: '12px',
                  }}
                >
                  {selectedFile.size} • {selectedFile.type}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: '600',
            color: '#333',
            mb: 2,
            fontSize: '14px',
          }}
        >
          Select Filing Method:
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          p: 3,
          pt: 0,
          gap: 2,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleNewComplaint}
          sx={{
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '600',
            px: 4,
            py: 1.5,
            minWidth: '160px',
            height: '48px',
            backgroundColor: '#1976d2',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              backgroundColor: '#1565c0',
              boxShadow: '0 4px 8px rgba(25, 118, 210, 0.4)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          New Complaint
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Description />}
          onClick={handleExistingCase}
          sx={{
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '600',
            px: 4,
            py: 1.5,
            minWidth: '160px',
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
          }}
        >
          Existing Case
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Group />}
          onClick={handleBatchExisting}
          sx={{
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '600',
            px: 4,
            py: 1.5,
            minWidth: '160px',
            height: '48px',
            borderColor: '#ff9800',
            color: '#ff9800',
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderColor: '#f57c00',
              backgroundColor: '#fff3e0',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(255, 152, 0, 0.3)',
            },
          }}
        >
          Batch Existing
        </Button>
        
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '600',
            px: 4,
            py: 1.5,
            minWidth: '120px',
            height: '48px',
            borderColor: '#6c757d',
            color: '#6c757d',
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderColor: '#5a6268',
              backgroundColor: '#f8f9fa',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(108, 117, 125, 0.3)',
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EFileModal;
