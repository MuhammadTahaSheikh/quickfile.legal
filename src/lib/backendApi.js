import { supabase } from './supabase';

// Get API URL from environment variable
const API_URL = process.env.REACT_APP_API_URL;

// Validate API URL - in production, it must be set
if (process.env.NODE_ENV === 'production') {
  if (!API_URL || API_URL === 'http://localhost:5001' || !API_URL.startsWith('http')) {
    console.error('REACT_APP_API_URL is missing or invalid in production. Please set it in Vercel environment variables.');
  }
}

// Fallback to localhost only in development
const getApiUrl = () => {
  return API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : '');
};

/**
 * Fetch with timeout to prevent hanging requests
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options
 * @param {number} timeout - Timeout in milliseconds (default: 30000 = 30 seconds)
 */
const fetchWithTimeout = (url, options = {}, timeout = 30000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection timeout: Backend server is not responding. Please check if the backend is running.')), timeout)
    )
  ]);
};

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
    const apiUrl = getApiUrl();
    if (!apiUrl) {
      throw new Error('API URL is not configured. Please set REACT_APP_API_URL in your environment variables.');
    }
    
    const response = await fetchWithTimeout(`${apiUrl}/api/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: `Server error: ${response.status} ${response.statusText}` };
      }
      throw new Error(errorData.error || 'Failed to fetch users');
    }

    const data = await response.json();
    
    return { 
      success: true,
      users: data.users || []
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    
    // Check if it's a connection/timeout error
    if (error.message.includes('timeout') || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return { 
        success: false, 
        error: 'Cannot connect to backend server. Please check if the backend is running and REACT_APP_API_URL is configured correctly.',
        users: []
      };
    }
    
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

    const apiUrl = getApiUrl();
    if (!apiUrl) {
      throw new Error('API URL is not configured. Please set REACT_APP_API_URL in your environment variables.');
    }
    
    const response = await fetchWithTimeout(`${apiUrl}/api/users/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: `Server error: ${response.status} ${response.statusText}` };
      }
      throw new Error(errorData.error || 'Failed to fetch stats');
    }

    const data = await response.json();

    return { 
      success: true,
      stats: data.stats
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    
    // Check if it's a connection/timeout error
    if (error.message.includes('timeout') || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return { 
        success: false, 
        error: 'Cannot connect to backend server. Please check if the backend is running and REACT_APP_API_URL is configured correctly.',
        stats: {
          total_users: 0,
          confirmed_users: 0,
          unconfirmed_users: 0,
          confirmed_today: 0
        }
      };
    }
    
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

    const apiUrl = getApiUrl();
    if (!apiUrl) {
      throw new Error('API URL is not configured. Please set REACT_APP_API_URL in your environment variables.');
    }
    
    const response = await fetchWithTimeout(`${apiUrl}/api/users/search?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: `Server error: ${response.status} ${response.statusText}` };
      }
      throw new Error(errorData.error || 'Failed to search users');
    }

    const data = await response.json();

    return { 
      success: true,
      users: data.users || []
    };
  } catch (error) {
    console.error('Error searching users:', error);
    
    // Check if it's a connection/timeout error
    if (error.message.includes('timeout') || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return { 
        success: false, 
        error: 'Cannot connect to backend server. Please check if the backend is running and REACT_APP_API_URL is configured correctly.',
        users: []
      };
    }
    
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

    const apiUrl = getApiUrl();
    if (!apiUrl) {
      throw new Error('API URL is not configured. Please set REACT_APP_API_URL in your environment variables.');
    }
    
    const response = await fetchWithTimeout(`${apiUrl}/api/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: `Server error: ${response.status} ${response.statusText}` };
      }
      throw new Error(errorData.error || 'Failed to update user role');
    }

    const data = await response.json();
    
    return { 
      success: true,
      message: data.message || 'User role updated successfully'
    };
  } catch (error) {
    console.error('Error updating user role:', error);
    
    // Check if it's a connection/timeout error
    if (error.message.includes('timeout') || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return { 
        success: false, 
        error: 'Cannot connect to backend server. Please check if the backend is running and REACT_APP_API_URL is configured correctly.'
      };
    }
    
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
    const apiUrl = getApiUrl();
    if (!apiUrl) {
      return { 
        status: 'error', 
        message: 'API URL is not configured. Please set REACT_APP_API_URL in your environment variables.' 
      };
    }
    
    // Use timeout for health check (15 seconds - faster for health check but still reasonable for slow networks)
    const response = await fetchWithTimeout(`${apiUrl}/api/health`, {}, 15000);
    
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
    
    // Check if it's a connection error
    if (error.message.includes('timeout') || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return { 
        status: 'error', 
        message: 'Cannot connect to backend server. Please check if the backend is running and REACT_APP_API_URL is configured correctly.',
        error: error.message
      };
    }
    
    return { 
      status: 'error', 
      message: 'Backend server not running. Please start the backend server.',
      error: error.message
    };
  }
};

/**
 * Upload a file to the backend
 * Calls the Node.js backend API
 */
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
    const apiUrl = getApiUrl();
    if (!apiUrl) {
      throw new Error('API URL is not configured. Please set REACT_APP_API_URL in your environment variables.');
    }

    const formData = new FormData();
    formData.append('file', file);

    // Use longer timeout for file uploads (60 seconds - files can be large and networks can be slow)
    const response = await fetchWithTimeout(`${apiUrl}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: formData,
    }, 60000);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // If response is not JSON (e.g., HTML error page), extract status info
        const errorText = await response.text().catch(() => '');
        if (errorText.startsWith('<!DOCTYPE')) {
          throw new Error(`Server error (${response.status} ${response.statusText}). The API server may not be running or configured correctly.`);
        }
        errorData = { error: `Server error: ${response.status} ${response.statusText}` };
      }
      throw new Error(errorData.error || 'Failed to upload file');
    }

    const data = await response.json();
    
    return { 
      success: true,
      file: data.file
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    
    // Check if it's a connection/timeout error
    if (error.message.includes('timeout') || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return { 
        success: false, 
        error: 'Cannot connect to backend server. Please check if the backend is running and REACT_APP_API_URL is configured correctly.'
      };
    }
    
    return { 
      success: false, 
      error: error.message 
    };
  }
};

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

    const apiUrl = getApiUrl();
    if (!apiUrl) {
      throw new Error('API URL is not configured. Please set REACT_APP_API_URL in your environment variables.');
    }
    
    const response = await fetchWithTimeout(`${apiUrl}/api/upload/files/${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: `Server error: ${response.status} ${response.statusText}` };
      }
      throw new Error(errorData.error || 'Failed to fetch files');
    }

    const data = await response.json();
    
    return { 
      success: true,
      files: data.files || []
    };
  } catch (error) {
    console.error('Error fetching files:', error);
    
    // Check if it's a connection/timeout error
    if (error.message.includes('timeout') || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return { 
        success: false, 
        error: 'Cannot connect to backend server. Please check if the backend is running and REACT_APP_API_URL is configured correctly.',
        files: []
      };
    }
    
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

    const apiUrl = getApiUrl();
    if (!apiUrl) {
      throw new Error('API URL is not configured. Please set REACT_APP_API_URL in your environment variables.');
    }
    
    const response = await fetchWithTimeout(`${apiUrl}/api/upload/files/${encodeURIComponent(userId)}/${encodeURIComponent(filename)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: `Server error: ${response.status} ${response.statusText}` };
      }
      throw new Error(errorData.error || 'Failed to delete file');
    }

    const data = await response.json();
    
    return { 
      success: true,
      message: data.message || 'File deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting file:', error);
    
    // Check if it's a connection/timeout error
    if (error.message.includes('timeout') || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return { 
        success: false, 
        error: 'Cannot connect to backend server. Please check if the backend is running and REACT_APP_API_URL is configured correctly.'
      };
    }
    
    return { 
      success: false, 
      error: error.message 
    };
  }
};

