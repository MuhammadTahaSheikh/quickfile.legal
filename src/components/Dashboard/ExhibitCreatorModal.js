import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Paper,
  InputAdornment,
} from '@mui/material';
import {
  Close,
  Description,
  Add,
  Remove,
  Visibility,
  KeyboardArrowUp,
  KeyboardArrowDown,
  AttachFile,
} from '@mui/icons-material';
import NewCaseModal from './NewCaseModal';

const ExhibitCreatorModal = ({ open, onClose, mainDocument }) => {
  const fileInputRef = useRef(null);
  
  const formControlStyles = {
    '& .MuiFormControlLabel-label': {
      color: '#1A2B47',
    },
    '& .MuiRadio-root': {
      color: '#FFD700',
      '&.Mui-checked': {
        color: '#FFD700',
      },
    },
    '& .MuiCheckbox-root': {
      color: '#FFD700',
      '&.Mui-checked': {
        color: '#FFD700',
      },
    },
    '& .MuiInputBase-input': {
      color: '#1A2B47',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FFD700',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E6C200',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FFD700',
    },
  };
  const [exhibitIdentifier, setExhibitIdentifier] = useState('letters');
  const [separateExhibits, setSeparateExhibits] = useState(false);
  const [exhibits, setExhibits] = useState([]);
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [newCaseModalOpen, setNewCaseModalOpen] = useState(false);

  const handleIdentifierChange = (event) => {
    setExhibitIdentifier(event.target.value);
  };

  const handleSeparateExhibitsChange = (event) => {
    setSeparateExhibits(event.target.checked);
  };

  const handleAttachFiles = () => {
    // Attach Files always opens the New Case modal
    setNewCaseModalOpen(true);
  };

  const handleNewCaseContinue = (caseData) => {
    console.log('New Case Data:', caseData);
    // After completing the new case form, proceed to file selection
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newExhibits = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      file: file,
      identifier: getNextIdentifier(),
    }));

    setExhibits(prev => [...prev, ...newExhibits]);
    event.target.value = '';
  };

  const getNextIdentifier = () => {
    if (exhibitIdentifier === 'numbers') {
      return (exhibits.length + 1).toString();
    } else if (exhibitIdentifier === 'letters') {
      return String.fromCharCode(65 + exhibits.length); // A, B, C, etc.
    }
    return '';
  };

  const handleRemoveExhibit = (exhibitId) => {
    setExhibits(prev => prev.filter(exhibit => exhibit.id !== exhibitId));
    if (selectedExhibit?.id === exhibitId) {
      setSelectedExhibit(null);
    }
  };

  const handleViewExhibit = (exhibit) => {
    if (exhibit.file) {
      const url = URL.createObjectURL(exhibit.file);
      window.open(url, '_blank');
    }
  };

  const moveExhibit = (exhibitId, direction) => {
    setExhibits(prev => {
      const newExhibits = [...prev];
      const currentIndex = newExhibits.findIndex(ex => ex.id === exhibitId);
      
      if (direction === 'up' && currentIndex > 0) {
        [newExhibits[currentIndex], newExhibits[currentIndex - 1]] = 
        [newExhibits[currentIndex - 1], newExhibits[currentIndex]];
      } else if (direction === 'down' && currentIndex < newExhibits.length - 1) {
        [newExhibits[currentIndex], newExhibits[currentIndex + 1]] = 
        [newExhibits[currentIndex + 1], newExhibits[currentIndex]];
      }
      
      return newExhibits;
    });
  };

  const handleAddExhibit = () => {
    // Add Exhibit directly opens file selection (no case form needed)
    fileInputRef.current?.click();
  };

  const handleExit = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          minHeight: '600px',
          maxHeight: '90vh',
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
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: '20px',
            color: '#FFFFFF',
          }}
        >
          Exhibit Creator
        </Typography>
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
      <DialogContent sx={{ p: 0, display: 'flex', height: '500px' }}>
        {/* Left Column - Controls */}
        <Box sx={{ 
          width: '300px', 
          p: 3, 
          borderRight: '1px solid #FFD700',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}>
          {/* Main Document */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#1A2B47' }}>
              Main Document
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={mainDocument?.name || 'C1-COMPLAINT-ATTACHEXHIBIT.pdf'}
              disabled
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '14px',
                  color: '#1A2B47',
                },
                ...formControlStyles,
              }}
            />
          </Box>

          {/* Exhibit Identifier */}
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 'bold', color: '#1A2B47', mb: 1 }}>
              Exhibit Identifier
            </FormLabel>
            <RadioGroup
              value={exhibitIdentifier}
              onChange={handleIdentifierChange}
              sx={formControlStyles}
            >
              <FormControlLabel 
                value="numbers" 
                control={<Radio size="small" />} 
                label="Numbers" 
                sx={{ fontSize: '14px' }}
              />
              <FormControlLabel 
                value="letters" 
                control={<Radio size="small" />} 
                label="Letters" 
                sx={{ fontSize: '14px' }}
              />
              <FormControlLabel 
                value="none" 
                control={<Radio size="small" />} 
                label="No Identifier" 
                sx={{ fontSize: '14px' }}
              />
            </RadioGroup>
          </FormControl>

          {/* Process */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#1A2B47' }}>
              Process
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AttachFile />}
              onClick={handleAttachFiles}
              disabled={exhibits.length === 0}
              fullWidth
              sx={{
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: '600',
                py: 1,
                borderColor: '#FFD700',
                color: '#FFD700',
                '&:hover': {
                  borderColor: '#E6C200',
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                },
                '&:disabled': {
                  borderColor: '#ccc',
                  color: '#ccc',
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              Attach Files
            </Button>
          </Box>

          {/* Efile Options */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#1A2B47' }}>
              Efile Options
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={separateExhibits}
                  onChange={handleSeparateExhibitsChange}
                  size="small"
                />
              }
              label="Separate Exhibits"
              sx={{ fontSize: '14px', ...formControlStyles }}
            />
          </Box>
        </Box>

        {/* Right Column - Exhibit Order */}
        <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: '#1A2B47' }}>
            Exhibit Order
          </Typography>
          
          <Paper
            sx={{
              flex: 1,
              border: '1px solid #FFD700',
              borderRadius: '4px',
              overflow: 'hidden',
              display: 'flex',
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Exhibit List */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              {exhibits.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {exhibits.map((exhibit, index) => (
                    <React.Fragment key={exhibit.id}>
                      <ListItem
                        sx={{
                          py: 1,
                          px: 2,
                          cursor: 'pointer',
                          backgroundColor: selectedExhibit?.id === exhibit.id ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                          '&:hover': {
                            backgroundColor: selectedExhibit?.id === exhibit.id ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 215, 0, 0.05)',
                          },
                        }}
                        onClick={() => setSelectedExhibit(exhibit)}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" sx={{ 
                                fontWeight: 'medium',
                                color: '#1A2B47',
                                fontSize: '14px'
                              }}>
                                {exhibit.identifier && `${exhibit.identifier}. `}{exhibit.name}
                              </Typography>
                            </Box>
                          }
                          sx={{
                            '& .MuiListItemText-primary': {
                              color: '#1A2B47',
                            }
                          }}
                        />
                        <ListItemSecondaryAction>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveExhibit(exhibit.id, 'up');
                              }}
                              disabled={index === 0}
                              sx={{ 
                                color: '#FFD700',
                                '&:disabled': { color: '#ccc' }
                              }}
                            >
                              <KeyboardArrowUp />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveExhibit(exhibit.id, 'down');
                              }}
                              disabled={index === exhibits.length - 1}
                              sx={{ 
                                color: '#FFD700',
                                '&:disabled': { color: '#ccc' }
                              }}
                            >
                              <KeyboardArrowDown />
                            </IconButton>
                          </Box>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < exhibits.length - 1 && <Divider />}
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
                    p: 3,
                  }}
                >
                  <Description sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                  <Typography variant="body2" sx={{ color: '#1A2B47' }}>
                    No exhibits added yet
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#1A2B47' }}>
                    Click "Attach Files" to add exhibits
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png,.gif"
        style={{ display: 'none' }}
      />

      {/* New Case Modal */}
      <NewCaseModal
        open={newCaseModalOpen}
        onClose={() => setNewCaseModalOpen(false)}
        onContinue={handleNewCaseContinue}
      />

      {/* Actions */}
      <DialogActions
        sx={{
          p: 3,
          pt: 2,
          gap: 2,
          justifyContent: 'space-between',
          borderTop: '1px solid #FFD700',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Button
          variant="outlined"
          onClick={handleExit}
          sx={{
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '600',
            px: 3,
            py: 1,
            borderColor: '#1A2B47',
            color: '#1A2B47',
            '&:hover': {
              borderColor: '#0F1A2F',
              backgroundColor: 'rgba(26, 43, 71, 0.1)',
            },
          }}
        >
          Exit
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddExhibit}
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: '600',
              px: 3,
              py: 1,
              borderColor: '#FFD700',
              color: '#FFD700',
              '&:hover': {
                borderColor: '#E6C200',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
              },
            }}
          >
            Add Exhibit
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Remove />}
            onClick={() => selectedExhibit && handleRemoveExhibit(selectedExhibit.id)}
            disabled={!selectedExhibit}
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: '600',
              px: 3,
              py: 1,
              borderColor: '#dc3545',
              color: '#dc3545',
              '&:hover': {
                borderColor: '#c82333',
                backgroundColor: '#f8d7da',
              },
              '&:disabled': {
                borderColor: '#ccc',
                color: '#ccc',
              },
            }}
          >
            Remove Exhibit
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => selectedExhibit && handleViewExhibit(selectedExhibit)}
            disabled={!selectedExhibit}
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: '600',
              px: 3,
              py: 1,
              borderColor: '#1A2B47',
              color: '#1A2B47',
              '&:hover': {
                borderColor: '#0F1A2F',
                backgroundColor: 'rgba(26, 43, 71, 0.1)',
              },
              '&:disabled': {
                borderColor: '#ccc',
                color: '#ccc',
              },
            }}
          >
            View Exhibit
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ExhibitCreatorModal;
