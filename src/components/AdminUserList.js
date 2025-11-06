import React, { useState, useEffect } from 'react';
import { 
  getAllUsers, 
  getUserStats,
  searchUsersByEmail,
  checkBackendHealth,
  updateUserRole 
} from '../lib/backendApi';
import { Select, MenuItem, FormControl } from '@mui/material';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [healthStatus, setHealthStatus] = useState(null);
  const [updatingRoles, setUpdatingRoles] = useState({});

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth().then(status => setHealthStatus(status));
  }, []);

  // Fetch users and stats on mount
  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllUsers();
      if (!data.success && data.error) {
        setError(data.error);
        setUsers([]);
      } else {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getUserStats();
      if (data.success && data.stats) {
        setStats(data.stats);
      } else {
        // Use default stats if fetch fails
        setStats({
          total_users: 0,
          admin_count: 0,
          confirmed_users: 0,
          unconfirmed_users: 0,
          confirmed_today: 0
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setStats({
        total_users: 0,
        admin_count: 0,
        confirmed_users: 0,
        unconfirmed_users: 0,
        confirmed_today: 0
      });
    }
  };

  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      fetchUsers();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchUsersByEmail(searchEmail);
      if (!data.success && data.error) {
        setError(data.error);
        setUsers([]);
      } else {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Error searching users:', err);
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchEmail('');
    fetchUsers();
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingRoles(prev => ({ ...prev, [userId]: true }));
      setError(null);
      
      const result = await updateUserRole(userId, newRole);
      
      if (result.success) {
        // Refresh the users list to show the updated role
        fetchUsers();
      } else {
        throw new Error(result.error || 'Failed to update role');
      }
    } catch (err) {
      console.error('Error updating role:', err);
      setError(err.message);
    } finally {
      setUpdatingRoles(prev => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Admin - User Management</h1>

      {/* Info Banner */}
      {/* Commented out - user requested to hide these status banners */}
      {healthStatus?.status === 'error' && false && (
        <div style={{
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>⚠️ Backend Server Not Running</div>
          <div style={{ fontSize: '14px', color: '#721c24' }}>
            Please start the backend server to view and manage users:
            <br /><br />
            <code style={{ backgroundColor: '#fff', padding: '8px 12px', borderRadius: '4px', display: 'block', marginTop: '8px' }}>
              cd backend && npm install && npm start
            </code>
          </div>
        </div>
      )}

      {healthStatus?.status === 'ok' && false && (
        <div style={{
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>✅ Backend Connected</div>
          <div style={{ fontSize: '14px', color: '#155724' }}>
            Admin user management is active. You can view all users and update roles directly from this panel.
          </div>
        </div>
      )}

      {/* Health Check Status - Commented out */}
      {healthStatus && false && (
        <div style={{ 
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: healthStatus.status === 'ok' ? '#d4edda' : '#f8d7da',
          border: `1px solid ${healthStatus.status === 'ok' ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px'
        }}>
          <strong>Backend Status:</strong> {healthStatus.status === 'ok' ? '✅ Connected' : '❌ Not Connected'}
        </div>
      )}

      {/* Statistics Cards */}
      {stats && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '30px',
          maxWidth: '500px'
        }}>
          <div style={{
            backgroundColor: '#007bff',
            padding: '20px',
            borderRadius: '8px',
            color: 'white'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {stats.admin_count || 0}
            </div>
            <div style={{ fontSize: '14px', marginTop: '4px' }}>👑 Admins</div>
          </div>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>
              {stats.total_users || 0}
            </div>
            <div style={{ color: '#6c757d', fontSize: '14px', marginTop: '4px' }}>Total Users</div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Search
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Reset
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '18px', color: '#6c757d' }}>Loading users...</div>
        </div>
      )}

      {/* Users List - Table Format */}
      {!loading && !error && (
        <>
          <div style={{ marginBottom: '20px', color: '#6c757d', fontWeight: '500' }}>
            Showing {users.length} user{users.length !== 1 ? 's' : ''}
          </div>
          
          {users.length === 0 ? (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              color: '#6c757d'
            }}>
              No users found.
            </div>
          ) : (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #dee2e6',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#212529', fontSize: '14px' }}>Name</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#212529', fontSize: '14px' }}>Email</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#212529', fontSize: '14px' }}>Role</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#212529', fontSize: '14px' }}>Status</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#212529', fontSize: '14px' }}>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr 
                      key={user.id}
                      style={{ 
                        borderBottom: index < users.length - 1 ? '1px solid #dee2e6' : 'none',
                        '&:hover': { backgroundColor: '#f8f9fa' }
                      }}
                    >
                      {/* Name */}
                      <td style={{ padding: '15px', color: '#212529', fontWeight: '500' }}>
                        {user.user_metadata?.first_name || user.user_metadata?.firstName} {user.user_metadata?.last_name || user.user_metadata?.lastName}
                      </td>
                      
                      {/* Email */}
                      <td style={{ padding: '15px', color: '#6c757d', fontSize: '14px' }}>
                        {user.email}
                      </td>
                      
                      {/* Role */}
                      <td style={{ padding: '15px' }}>
                        <FormControl size="small" style={{ minWidth: '120px' }}>
                          <Select
                            value={user.user_metadata?.role || 'user'}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            disabled={updatingRoles[user.id]}
                            sx={{
                              backgroundColor: 'white',
                              '& .MuiSelect-select': {
                                padding: '6px 14px',
                                color: '#212529',
                                fontSize: '14px'
                              }
                            }}
                            MenuProps={{
                              PaperProps: {
                                sx: {
                                  '& .MuiMenuItem-root': {
                                    color: '#212529 !important',
                                    fontSize: '14px',
                                    '&:hover': {
                                      backgroundColor: 'rgba(0, 0, 0, 0.04) !important'
                                    },
                                    '&.Mui-selected': {
                                      backgroundColor: 'rgba(0, 0, 0, 0.08) !important',
                                      color: '#212529 !important',
                                      fontWeight: '500',
                                      '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.12) !important'
                                      }
                                    }
                                  }
                                }
                              }
                            }}
                          >
                            <MenuItem value="user">👤 User</MenuItem>
                            <MenuItem value="admin">👑 Admin</MenuItem>
                          </Select>
                        </FormControl>
                        {updatingRoles[user.id] && (
                          <span style={{ marginLeft: '8px', color: '#007bff', fontSize: '12px' }}>
                            Updating...
                          </span>
                        )}
                      </td>
                      
                      {/* Status */}
                      <td style={{ padding: '15px' }}>
                        {user.email_confirmed_at ? (
                          <span style={{ 
                            color: '#28a745', 
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>
                            ✓ Verified
                          </span>
                        ) : (
                          <span style={{ 
                            color: '#ffc107', 
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>
                            ⚠ Unverified
                          </span>
                        )}
                      </td>
                      
                      {/* Created */}
                      <td style={{ padding: '15px', color: '#6c757d', fontSize: '13px' }}>
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminUserList;

