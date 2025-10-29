const supabaseAdmin = require('../config/supabase');

/**
 * Middleware to verify authentication token
 */
const authenticate = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!authToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(authToken);
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

/**
 * Middleware to verify admin role
 */
const requireAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userRole = user.user_metadata?.role || 'user';
    
    if (userRole !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(403).json({ error: 'Admin access required' });
  }
};

/**
 * Helper to get authenticated user from token (for non-middleware use)
 */
const getAuthenticatedUser = async (authToken) => {
  try {
    if (!authToken) {
      return { user: null, error: 'No token provided' };
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(authToken);
    
    if (error || !user) {
      return { user: null, error: 'Invalid token' };
    }

    return { user, error: null };
  } catch (error) {
    console.error('Get user error:', error);
    return { user: null, error: error.message };
  }
};

/**
 * Helper to get user details from metadata
 */
const getUserDetails = (user) => {
  const userEmail = user.email || 'unknown';
  // Use unique user ID to ensure folder isolation
  const userId = user.id;
  const userName = user.user_metadata?.first_name && user.user_metadata?.last_name
    ? `${user.user_metadata.first_name}_${user.user_metadata.last_name}`
    : userEmail.split('@')[0];
  
  return { userEmail, userName, userId };
};

module.exports = {
  authenticate,
  requireAdmin,
  getAuthenticatedUser,
  getUserDetails
};

