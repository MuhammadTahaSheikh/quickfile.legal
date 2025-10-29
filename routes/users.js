const express = require('express');
const supabaseAdmin = require('../config/supabase');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// All user routes require authentication and admin access
router.use(authenticate);
router.use(requireAdmin);

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    // Get all users
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ users: data.users || [] });
  } catch (error) {
    console.error('Error in /api/users:', error);
    res.status(500).json({ error: error.message });
  }
});

// Search users by email
router.get('/search', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: 'Email query parameter required' });
    }

    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const users = data.users || [];
    const filtered = users.filter(u => 
      u.email && u.email.toLowerCase().includes(email.toLowerCase())
    );

    res.json({ users: filtered });
  } catch (error) {
    console.error('Error in /api/users/search:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user statistics
router.get('/stats', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const users = data.users || [];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const stats = {
      total_users: users.length,
      admin_count: users.filter(u => {
        const role = u.user_metadata?.role || u.raw_user_meta_data?.role;
        return role === 'admin';
      }).length,
      confirmed_users: users.filter(u => u.email_confirmed_at).length,
      unconfirmed_users: users.filter(u => !u.email_confirmed_at).length,
      confirmed_today: users.filter(u => 
        u.email_confirmed_at && new Date(u.email_confirmed_at) >= today
      ).length,
    };

    res.json({ stats });
  } catch (error) {
    console.error('Error in /api/users/stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update user role
router.put('/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !['admin', 'user'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be "admin" or "user"' });
    }

    // Get the current user data
    const { data: targetUser, error: getUserError } = await supabaseAdmin.auth.admin.getUserById(id);
    
    if (getUserError || !targetUser.user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user metadata
    const updatedMetadata = {
      ...targetUser.user.user_metadata,
      role: role
    };

    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      id,
      { user_metadata: updatedMetadata }
    );

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    res.json({ success: true, message: 'User role updated successfully' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



