import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  Paper,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Business,
  Work,
  LocationOn,
  AccountCircle,
  Save,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateUser, loading } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    firstName: user?.user_metadata?.first_name || user?.user_metadata?.firstName || '',
    lastName: user?.user_metadata?.last_name || user?.user_metadata?.lastName || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    firmName: user?.user_metadata?.firm_name || user?.user_metadata?.firmName || '',
    position: user?.user_metadata?.position || '',
    state: user?.user_metadata?.state || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await updateUser({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        firm_name: formData.firmName,
        position: formData.position,
        state: formData.state,
      });

      if (result.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setEditMode(false);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating your profile' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.user_metadata?.first_name || user?.user_metadata?.firstName || '',
      lastName: user?.user_metadata?.last_name || user?.user_metadata?.lastName || '',
      email: user?.email || '',
      phone: user?.user_metadata?.phone || '',
      firmName: user?.user_metadata?.firm_name || user?.user_metadata?.firmName || '',
      position: user?.user_metadata?.position || '',
      state: user?.user_metadata?.state || '',
    });
    setEditMode(false);
    setMessage({ type: '', text: '' });
  };

  const getInitials = () => {
    const first = formData.firstName || 'U';
    const last = formData.lastName || '';
    return `${first[0]}${last[0] || ''}`.toUpperCase();
  };

  const subscription = user?.user_metadata?.subscription || 'Trial';
  const trialEnds = user?.user_metadata?.trial_ends;
  const role = user?.user_metadata?.role || 'user';

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#1A2B47', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
            My <Box component="span" sx={{ color: '#FFD700' }}>Profile</Box>
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Manage your account information and preferences
          </Typography>
        </Box>

        {message.text && (
          <Alert
            severity={message.type === 'success' ? 'success' : 'error'}
            sx={{ mb: 3 }}
            onClose={() => setMessage({ type: '', text: '' })}
          >
            {message.text}
          </Alert>
        )}

        <Card sx={{ backgroundColor: '#FFFFFF', borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Profile Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 3, borderBottom: '2px solid #E0E0E0' }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: '#FFD700',
                  color: '#1A2B47',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  mr: 3,
                }}
              >
                {getInitials()}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" sx={{ color: '#1A2B47', fontWeight: 'bold' }}>
                  {formData.firstName} {formData.lastName}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                  {formData.email}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: subscription === 'Trial' ? '#FFF3CD' : '#D4EDDA',
                      color: subscription === 'Trial' ? '#856404' : '#155724',
                      fontWeight: 'bold',
                    }}
                  >
                    {subscription}
                  </Typography>
                  {role === 'admin' && (
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: '#FFD700',
                        color: '#1A2B47',
                        fontWeight: 'bold',
                      }}
                    >
                      Admin
                    </Typography>
                  )}
                </Box>
              </Box>
              {!editMode ? (
                <Button
                  variant="contained"
                  startIcon={<AccountCircle />}
                  onClick={() => setEditMode(true)}
                  sx={{
                    bgcolor: '#FFD700',
                    color: '#1A2B47',
                    '&:hover': { bgcolor: '#FFC700' },
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={saving ? <CircularProgress size={20} /> : <Save />}
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                      bgcolor: '#FFD700',
                      color: '#1A2B47',
                      '&:hover': { bgcolor: '#FFC700' },
                    }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              )}
            </Box>

            {/* Profile Information */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Person sx={{ mr: 1, color: '#FFD700' }} />
                  <Typography variant="subtitle2" sx={{ color: '#666', textTransform: 'uppercase' }}>
                    First Name
                  </Typography>
                </Box>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1" sx={{ color: '#1A2B47', fontWeight: 500 }}>
                    {formData.firstName || 'Not set'}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Person sx={{ mr: 1, color: '#FFD700' }} />
                  <Typography variant="subtitle2" sx={{ color: '#666', textTransform: 'uppercase' }}>
                    Last Name
                  </Typography>
                </Box>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1" sx={{ color: '#1A2B47', fontWeight: 500 }}>
                    {formData.lastName || 'Not set'}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email sx={{ mr: 1, color: '#FFD700' }} />
                  <Typography variant="subtitle2" sx={{ color: '#666', textTransform: 'uppercase' }}>
                    Email Address
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#1A2B47', fontWeight: 500 }}>
                  {formData.email}
                </Typography>
                <Typography variant="caption" sx={{ color: '#999' }}>
                  Email cannot be changed
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone sx={{ mr: 1, color: '#FFD700' }} />
                  <Typography variant="subtitle2" sx={{ color: '#666', textTransform: 'uppercase' }}>
                    Phone Number
                  </Typography>
                </Box>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1" sx={{ color: '#1A2B47', fontWeight: 500 }}>
                    {formData.phone || 'Not set'}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Business sx={{ mr: 1, color: '#FFD700' }} />
                  <Typography variant="subtitle2" sx={{ color: '#666', textTransform: 'uppercase' }}>
                    Firm Name
                  </Typography>
                </Box>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="firmName"
                    value={formData.firmName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1" sx={{ color: '#1A2B47', fontWeight: 500 }}>
                    {formData.firmName || 'Not set'}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Work sx={{ mr: 1, color: '#FFD700' }} />
                  <Typography variant="subtitle2" sx={{ color: '#666', textTransform: 'uppercase' }}>
                    Position
                  </Typography>
                </Box>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1" sx={{ color: '#1A2B47', fontWeight: 500 }}>
                    {formData.position || 'Not set'}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, color: '#FFD700' }} />
                  <Typography variant="subtitle2" sx={{ color: '#666', textTransform: 'uppercase' }}>
                    State
                  </Typography>
                </Box>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1" sx={{ color: '#1A2B47', fontWeight: 500 }}>
                    {formData.state || 'Not set'}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* Account Information */}
            {!editMode && (
              <>
                <Divider sx={{ my: 4 }} />
                <Typography variant="h6" sx={{ color: '#1A2B47', mb: 2, fontWeight: 'bold' }}>
                  Account Information
                </Typography>
                <Paper sx={{ p: 2, bgcolor: '#F5F5F5' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: '#666', textTransform: 'uppercase' }}>
                        Subscription Status
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#1A2B47', fontWeight: 500 }}>
                        {subscription}
                      </Typography>
                    </Grid>
                    {trialEnds && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" sx={{ color: '#666', textTransform: 'uppercase' }}>
                          Trial Ends
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#1A2B47', fontWeight: 500 }}>
                          {new Date(trialEnds).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: '#666', textTransform: 'uppercase' }}>
                        Account Type
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#1A2B47', fontWeight: 500 }}>
                        {role === 'admin' ? 'Administrator' : 'User'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;

