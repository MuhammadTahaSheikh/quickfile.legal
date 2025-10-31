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
          backgroundColor: '#FFFFFF',
          border: '1px solid #FFD700',
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
          borderBottom: '1px solid #FFD700',
          backgroundColor: '#1A2B47',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CloudUpload sx={{ color: '#FFD700', fontSize: 24 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#FFFFFF',
            }}
          >
            E-File Options
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: '#FFD700',
            '&:hover': {
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
              color: '#E6C200',
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 3, backgroundColor: '#FFFFFF' }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: '16px',
              color: '#1A2B47',
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
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #FFD700',
              }}
            >
              <Description sx={{ color: '#FFD700', fontSize: 32 }} />
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: '600',
                    color: '#1A2B47',
                    fontSize: '14px',
                  }}
                >
                  {selectedFile.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#1A2B47',
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
            color: '#1A2B47',
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
          backgroundColor: '#FFFFFF',
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
            backgroundColor: '#FFD700',
            color: '#1A2B47',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(255, 215, 0, 0.3)',
            '&:hover': {
              backgroundColor: '#E6C200',
              boxShadow: '0 4px 8px rgba(255, 215, 0, 0.4)',
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
            borderColor: '#1A2B47',
            color: '#1A2B47',
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderColor: '#0F1A2F',
              backgroundColor: 'rgba(26, 43, 71, 0.1)',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(26, 43, 71, 0.3)',
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
            borderColor: '#FFD700',
            color: '#FFD700',
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderColor: '#E6C200',
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(255, 215, 0, 0.3)',
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
            borderColor: '#1A2B47',
            color: '#1A2B47',
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderColor: '#0F1A2F',
              backgroundColor: 'rgba(26, 43, 71, 0.1)',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(26, 43, 71, 0.3)',
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
