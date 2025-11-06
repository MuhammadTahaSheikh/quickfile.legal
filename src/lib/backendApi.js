import { supabase } from './supabase';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY;

/**
 * Get all users (admin only)
 * Uses Supabase Admin API directly
 */
export const getAllUsers = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    // Check if user is admin
    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin') {
      throw new Error('Admin access required');
    }

    // Use Supabase Admin API to fetch all users
    if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) {
      throw new Error('Supabase service role key not configured. Please set REACT_APP_SUPABASE_SERVICE_ROLE_KEY in your environment variables.');
    }

    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || errorData.error || 'Failed to fetch users');
    }

    const data = await response.json();
    
    // Handle different response formats
    // Supabase Admin API might return users as array directly or wrapped in object
    const users = Array.isArray(data) ? data : (data.users || []);
    
    return { 
      success: true,
      users: users
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { 
      success: false, 
      error: error.message,
      users: []
    };
  }
};

/**
 * Get user statistics
 * Uses Supabase Admin API directly
 */
export const getUserStats = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    // Check if user is admin
    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin') {
      throw new Error('Admin access required');
    }

    // Use Supabase Admin API to fetch all users and calculate stats
    if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) {
      throw new Error('Supabase service role key not configured');
    }

    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || errorData.error || 'Failed to fetch stats');
    }

    const data = await response.json();
    
    // Handle different response formats
    const users = Array.isArray(data) ? data : (data.users || []);

    // Calculate statistics
    const totalUsers = users.length;
    const adminCount = users.filter(u => u.user_metadata?.role === 'admin').length;
    const confirmedUsers = users.filter(u => u.email_confirmed_at).length;
    const unconfirmedUsers = totalUsers - confirmedUsers;
    
    // Count confirmed users today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const confirmedToday = users.filter(u => {
      if (!u.email_confirmed_at) return false;
      const confirmedDate = new Date(u.email_confirmed_at);
      confirmedDate.setHours(0, 0, 0, 0);
      return confirmedDate.getTime() === today.getTime();
    }).length;

    return { 
      success: true,
      stats: {
        total_users: totalUsers,
        admin_count: adminCount,
        confirmed_users: confirmedUsers,
        unconfirmed_users: unconfirmedUsers,
        confirmed_today: confirmedToday
      }
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { 
      success: false, 
      error: error.message,
      stats: {
        total_users: 0,
        admin_count: 0,
        confirmed_users: 0,
        unconfirmed_users: 0,
        confirmed_today: 0
      }
    };
  }
};

/**
 * Search users by email
 * Uses Supabase Admin API directly
 */
export const searchUsersByEmail = async (email) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    // Check if user is admin
    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin') {
      throw new Error('Admin access required');
    }

    // Use Supabase Admin API to search users
    if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) {
      throw new Error('Supabase service role key not configured');
    }

    // Fetch all users and filter by email
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || errorData.error || 'Failed to search users');
    }

    const data = await response.json();
    
    // Handle different response formats
    const allUsers = Array.isArray(data) ? data : (data.users || []);
    
    // Filter users by email (case-insensitive partial match)
    const searchTerm = email.toLowerCase().trim();
    const filteredUsers = allUsers.filter(u => 
      u.email && u.email.toLowerCase().includes(searchTerm)
    );

    return { 
      success: true,
      users: filteredUsers
    };
  } catch (error) {
    console.error('Error searching users:', error);
    return { 
      success: false, 
      error: error.message,
      users: []
    };
  }
};

/**
 * Update user role (admin only)
 * Uses Supabase Admin API directly
 */
export const updateUserRole = async (userId, newRole) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    // Check if user is admin
    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin') {
      throw new Error('Admin access required');
    }

    if (!['admin', 'user'].includes(newRole)) {
      throw new Error('Invalid role');
    }

    // Use Supabase Admin API to update user metadata
    if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) {
      throw new Error('Supabase service role key not configured');
    }

    // First, get the current user to preserve existing metadata
    const getUserResponse = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!getUserResponse.ok) {
      const errorData = await getUserResponse.json();
      throw new Error(errorData.error?.message || errorData.error || 'Failed to fetch user');
    }

    const userData = await getUserResponse.json();
    // Handle response format - user might be wrapped or direct
    const targetUser = userData.user || userData;
    const currentMetadata = targetUser?.user_metadata || userData.user_metadata || {};

    // Update user metadata with new role
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_metadata: {
          ...currentMetadata,
          role: newRole
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || errorData.error || 'Failed to update user role');
    }

    return { 
      success: true,
      message: 'User role updated successfully'
    };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

/**
 * Check backend health
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    
    if (!response.ok) {
      return { status: 'error', message: 'Backend not responding' };
    }

    const data = await response.json();
    
    // Also check user status
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const userRole = user.user_metadata?.role || 'user';
      return { 
        status: 'ok', 
        message: 'Connected',
        authenticated: true,
        role: userRole,
        backend: data
      };
    }
    
    return { 
      status: 'ok', 
      message: 'Connected but not authenticated',
      authenticated: false,
      backend: data
    };
  } catch (error) {
    console.error('Health check error:', error);
    return { 
      status: 'error', 
      message: 'Backend server not running. Please start the backend server on port 5000.',
      error: error.message
    };
  }
};

/**
 * Upload a file to the backend
 * Calls the Node.js backend API
 */
// COMMENTED OUT: Backend file upload functionality
/*
export const uploadFile = async (file, userId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No access token available');
    }

    // Create FormData
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload file');
    }

    const data = await response.json();
    
    return { 
      success: true,
      file: data.file
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};
*/

/**
 * Get files for a user
 * Calls the Node.js backend API
 */
export const getUserFiles = async (userId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_URL}/api/upload/files/${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch files');
    }

    const data = await response.json();
    
    return { 
      success: true,
      files: data.files || []
    };
  } catch (error) {
    console.error('Error fetching files:', error);
    return { 
      success: false, 
      error: error.message,
      files: []
    };
  }
};

/**
 * Delete a file
 * Calls the Node.js backend API
 */
export const deleteFile = async (userId, filename) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_URL}/api/upload/files/${encodeURIComponent(userId)}/${encodeURIComponent(filename)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete file');
    }

    const data = await response.json();
    
    return { 
      success: true,
      message: data.message || 'File deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

