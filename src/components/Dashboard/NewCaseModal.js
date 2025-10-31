import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  Grid,
  Divider,
  Alert,
} from '@mui/material';
import {
  Close,
} from '@mui/icons-material';

const NewCaseModal = ({ open, onClose, onContinue }) => {
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
    '& .MuiSelect-root': {
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
    '& .MuiInputBase-input': {
      color: '#1A2B47',
    },
    '& .MuiSelect-icon': {
      color: '#FFD700',
    },
    '& .MuiMenuItem-root': {
      color: '#1A2B47',
      '&:hover': {
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
      },
      '&.Mui-selected': {
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        '&:hover': {
          backgroundColor: 'rgba(255, 215, 0, 0.3)',
        },
      },
    },
  };

  const [formData, setFormData] = useState({
    // Type of Court
    circuitCourt: 'civil',
    countyCourt: '',
    
    // Related Cases
    relatedCases: 'no',
    
    // Remedies Sought
    remedies: {
      monetary: true,
      nonMonetary: false,
      declaratory: false,
      punitive: false,
    },
    
    // Class Action
    classAction: 'no',
    
    // Jury Trial
    juryTrial: 'yes',
    
    // Counts
    causesOfAction: 1,
    defendants: 1,
    subpoenas: 0,
    
    // Complex Business Court
    complexBusiness: 'no',
    
    // Type of Case
    caseType: 'other',
    otherCaseType: 'Insurance Claims',
    
    // Claim Amount
    claimAmount: 59000,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleRemedyChange = (remedy, checked) => {
    setFormData(prev => ({
      ...prev,
      remedies: {
        ...prev.remedies,
        [remedy]: checked
      }
    }));
  };

  const handleContinue = () => {
    const newErrors = {};
    
    // Validation
    if (!formData.claimAmount || formData.claimAmount <= 0) {
      newErrors.claimAmount = 'Please Enter Claim Amount';
    }
    
    if (formData.caseType === 'other' && !formData.otherCaseType.trim()) {
      newErrors.otherCaseType = 'Please specify case type';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Call the continue handler with form data
    onContinue(formData);
    onClose();
  };

  const caseTypes = [
    'Eminent Domain',
    'Contracts and Indebtedness',
    'Auto Negligence',
    'Products Liability',
    'Condominium',
    'Negligence-Other',
    'Real Property/Mortgage Foreclosure',
    'Professional Malpractice',
    'Evictions',
    'Replevin',
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
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
          New Case
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
      <DialogContent sx={{ p: 3, backgroundColor: '#FFFFFF' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Type of Court */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1A2B47' }}>
              Type of Court
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                    Circuit
                  </FormLabel>
                  <RadioGroup
                    value={formData.circuitCourt}
                    onChange={(e) => handleInputChange('circuitCourt', e.target.value)}
                    sx={formControlStyles}
                  >
                    <FormControlLabel value="civil" control={<Radio />} label="Civil" />
                    <FormControlLabel value="family" control={<Radio />} label="Family" />
                    <FormControlLabel value="probate" control={<Radio />} label="Probate" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontWeight: 'bold', color: '#1A2B47' }}>
                    County
                  </FormLabel>
                  <RadioGroup
                    value={formData.countyCourt}
                    onChange={(e) => handleInputChange('countyCourt', e.target.value)}
                    sx={formControlStyles}
                  >
                    <FormControlLabel value="civil" control={<Radio />} label="Civil" />
                    <FormControlLabel value="smallClaims" control={<Radio />} label="Small Claims" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Related Cases */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1A2B47' }}>
              Related Cases?
            </Typography>
            <RadioGroup
              value={formData.relatedCases}
              onChange={(e) => handleInputChange('relatedCases', e.target.value)}
              row
              sx={formControlStyles}
            >
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            </RadioGroup>
          </Box>

          <Divider />

          {/* Remedies Sought */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1A2B47' }}>
              Remedies Sought (Check All that Apply)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ...formControlStyles }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.remedies.monetary}
                    onChange={(e) => handleRemedyChange('monetary', e.target.checked)}
                  />
                }
                label="Monetary"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.remedies.nonMonetary}
                    onChange={(e) => handleRemedyChange('nonMonetary', e.target.checked)}
                  />
                }
                label="Non-monetary"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.remedies.declaratory}
                    onChange={(e) => handleRemedyChange('declaratory', e.target.checked)}
                  />
                }
                label="Declaratory or Injunctive Relief"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.remedies.punitive}
                    onChange={(e) => handleRemedyChange('punitive', e.target.checked)}
                  />
                }
                label="Punitive"
              />
            </Box>
          </Box>

          <Divider />

          {/* Class Action, Jury Trial, Counts */}
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1A2B47' }}>
                Class Action?
              </Typography>
              <RadioGroup
                value={formData.classAction}
                onChange={(e) => handleInputChange('classAction', e.target.value)}
                sx={formControlStyles}
              >
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1A2B47' }}>
                Jury Trial Demanded?
              </Typography>
              <RadioGroup
                value={formData.juryTrial}
                onChange={(e) => handleInputChange('juryTrial', e.target.value)}
                sx={formControlStyles}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1A2B47' }}>
                Complex Business Court Indicator
              </Typography>
              <RadioGroup
                value={formData.complexBusiness}
                onChange={(e) => handleInputChange('complexBusiness', e.target.value)}
                sx={formControlStyles}
              >
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </Grid>
          </Grid>

          <Divider />

          {/* Counts */}
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1A2B47' }}>
                Causes of Action?
              </Typography>
              <Select
                value={formData.causesOfAction}
                onChange={(e) => handleInputChange('causesOfAction', e.target.value)}
                fullWidth
                size="small"
                sx={{
                  ...formControlStyles,
                  '& .MuiSelect-select': {
                    color: '#1A2B47',
                    fontSize: '14px',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        color: '#1A2B47',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(255, 215, 0, 0.2)',
                        },
                      },
                    },
                  },
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <MenuItem key={num} value={num}>{num}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1A2B47' }}>
                Defendants?
              </Typography>
              <Select
                value={formData.defendants}
                onChange={(e) => handleInputChange('defendants', e.target.value)}
                fullWidth
                size="small"
                sx={{
                  ...formControlStyles,
                  '& .MuiSelect-select': {
                    color: '#1A2B47',
                    fontSize: '14px',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        color: '#1A2B47',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(255, 215, 0, 0.2)',
                        },
                      },
                    },
                  },
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <MenuItem key={num} value={num}>{num}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1A2B47' }}>
                Subpoenas?
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Select
                  value={formData.subpoenas}
                  onChange={(e) => handleInputChange('subpoenas', e.target.value)}
                  fullWidth
                  size="small"
                  sx={{
                    ...formControlStyles,
                    '& .MuiSelect-select': {
                      color: '#1A2B47',
                      fontSize: '14px',
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root': {
                          color: '#1A2B47',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(255, 215, 0, 0.2)',
                          },
                        },
                      },
                    },
                  }}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                </Select>
                <Typography variant="caption" sx={{ color: '#1A2B47' }}>
                  Not Summons
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider />

          {/* Type of Case */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1A2B47' }}>
              Type of Case
            </Typography>
            <Grid container spacing={2} sx={formControlStyles}>
              {caseTypes.map((caseType, index) => (
                <Grid item xs={6} key={caseType}>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={formData.caseType === caseType.toLowerCase().replace(/\s+/g, '')}
                        onChange={(e) => handleInputChange('caseType', e.target.value)}
                        value={caseType.toLowerCase().replace(/\s+/g, '')}
                      />
                    }
                    label={caseType}
                  />
                </Grid>
              ))}
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={formData.caseType === 'other'}
                      onChange={(e) => handleInputChange('caseType', 'other')}
                      value="other"
                    />
                  }
                  label="Other"
                />
                {formData.caseType === 'other' && (
                  <Box sx={{ ml: 4, mt: 1 }}>
                    <TextField
                      value={formData.otherCaseType}
                      onChange={(e) => handleInputChange('otherCaseType', e.target.value)}
                      size="small"
                      fullWidth
                      placeholder="Specify case type"
                      error={!!errors.otherCaseType}
                      helperText={errors.otherCaseType}
                      sx={formControlStyles}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Claim Amount */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: errors.claimAmount ? '#d32f2f' : '#1A2B47' 
                }}
              >
                {errors.claimAmount || 'Please Enter Claim Amount'}
              </Typography>
              <TextField
                type="number"
                value={formData.claimAmount}
                onChange={(e) => handleInputChange('claimAmount', parseInt(e.target.value) || 0)}
                size="small"
                sx={{ 
                  width: '150px', 
                  ...formControlStyles,
                  '& .MuiInputBase-input': {
                    color: '#1A2B47',
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#1A2B47',
                  },
                }}
                error={!!errors.claimAmount}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          p: 3,
          pt: 2,
          justifyContent: 'flex-end',
          borderTop: '1px solid #FFD700',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Button
          variant="contained"
          onClick={handleContinue}
          sx={{
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '600',
            px: 4,
            py: 1.5,
            backgroundColor: '#FFD700',
            color: '#1A2B47',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(255, 215, 0, 0.3)',
            '&:hover': {
              backgroundColor: '#E6C200',
              boxShadow: '0 4px 8px rgba(255, 215, 0, 0.4)',
            },
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCaseModal;
