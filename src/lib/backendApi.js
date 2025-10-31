import { supabase } from './supabase';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

/**
 * Get all users (admin only)
 * Calls the Node.js backend API
 */
export const getAllUsers = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No access token available');
    }

    // Call the backend API
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch users');
    }

    const data = await response.json();
    
    return { 
      success: true,
      users: data.users || []
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
 * Calls the Node.js backend API
 */
export const getUserStats = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_URL}/api/users/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch stats');
    }

    const data = await response.json();

    return { 
      success: true,
      stats: data.stats
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { 
      success: false, 
      error: error.message,
      stats: {
        total_users: 0,
        confirmed_users: 0,
        unconfirmed_users: 0,
        confirmed_today: 0
      }
    };
  }
};

/**
 * Search users by email
 * Calls the Node.js backend API
 */
export const searchUsersByEmail = async (email) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_URL}/api/users/search?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to search users');
    }

    const data = await response.json();

    return { 
      success: true,
      users: data.users || []
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
 * Calls the Node.js backend API
 */
export const updateUserRole = async (userId, newRole) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No access token available');
    }

    if (!['admin', 'user'].includes(newRole)) {
      throw new Error('Invalid role');
    }

    const response = await fetch(`${API_URL}/api/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update user role');
    }

    const data = await response.json();
    
    return { 
      success: true,
      message: data.message || 'User role updated successfully'
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

