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
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: '20px',
            color: '#333',
          }}
        >
          New Case
        </Typography>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Type of Court */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
              Type of Court
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Circuit
                  </FormLabel>
                  <RadioGroup
                    value={formData.circuitCourt}
                    onChange={(e) => handleInputChange('circuitCourt', e.target.value)}
                  >
                    <FormControlLabel value="civil" control={<Radio />} label="Civil" />
                    <FormControlLabel value="family" control={<Radio />} label="Family" />
                    <FormControlLabel value="probate" control={<Radio />} label="Probate" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontWeight: 'bold', color: '#333' }}>
                    County
                  </FormLabel>
                  <RadioGroup
                    value={formData.countyCourt}
                    onChange={(e) => handleInputChange('countyCourt', e.target.value)}
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
              Related Cases?
            </Typography>
            <RadioGroup
              value={formData.relatedCases}
              onChange={(e) => handleInputChange('relatedCases', e.target.value)}
              row
            >
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            </RadioGroup>
          </Box>

          <Divider />

          {/* Remedies Sought */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
              Remedies Sought (Check All that Apply)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                Class Action?
              </Typography>
              <RadioGroup
                value={formData.classAction}
                onChange={(e) => handleInputChange('classAction', e.target.value)}
              >
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                Jury Trial Demanded?
              </Typography>
              <RadioGroup
                value={formData.juryTrial}
                onChange={(e) => handleInputChange('juryTrial', e.target.value)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                Complex Business Court Indicator
              </Typography>
              <RadioGroup
                value={formData.complexBusiness}
                onChange={(e) => handleInputChange('complexBusiness', e.target.value)}
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
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                Causes of Action?
              </Typography>
              <Select
                value={formData.causesOfAction}
                onChange={(e) => handleInputChange('causesOfAction', e.target.value)}
                fullWidth
                size="small"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <MenuItem key={num} value={num}>{num}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                Defendants?
              </Typography>
              <Select
                value={formData.defendants}
                onChange={(e) => handleInputChange('defendants', e.target.value)}
                fullWidth
                size="small"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <MenuItem key={num} value={num}>{num}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                Subpoenas?
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Select
                  value={formData.subpoenas}
                  onChange={(e) => handleInputChange('subpoenas', e.target.value)}
                  fullWidth
                  size="small"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                </Select>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Not Summons
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider />

          {/* Type of Case */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
              Type of Case
            </Typography>
            <Grid container spacing={2}>
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
                  color: errors.claimAmount ? '#d32f2f' : '#333' 
                }}
              >
                {errors.claimAmount || 'Please Enter Claim Amount'}
              </Typography>
              <TextField
                type="number"
                value={formData.claimAmount}
                onChange={(e) => handleInputChange('claimAmount', parseInt(e.target.value) || 0)}
                size="small"
                sx={{ width: '150px' }}
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
          borderTop: '1px solid #e0e0e0',
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
            backgroundColor: '#1976d2',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              backgroundColor: '#1565c0',
              boxShadow: '0 4px 8px rgba(25, 118, 210, 0.4)',
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
