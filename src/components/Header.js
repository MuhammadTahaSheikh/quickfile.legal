import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Chip,
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Phone, 
  Dashboard, 
  Person, 
  Logout,
  AccountCircle 
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tutorialsAnchor, setTutorialsAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const { user, isAuthenticated, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTutorialsClick = (event) => {
    setTutorialsAnchor(event.currentTarget);
  };

  const handleTutorialsClose = () => {
    setTutorialsAnchor(null);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        <ListItem component={Link} to="/about">
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem component={Link} to="/contact">
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem component={Link} to="/faq">
          <ListItemText primary="FAQ" />
        </ListItem>
        <ListItem>
          <Button
            onClick={handleTutorialsClick}
            sx={{ color: 'text.primary', textTransform: 'none' }}
          >
            Tutorials
          </Button>
        </ListItem>
        {isAuthenticated ? (
          <>
            <ListItem component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem component={Link} to="/signup">
              <ListItemText primary="Sign Up" />
            </ListItem>
            <ListItem component={Link} to="/login">
              <ListItemText primary="User Login" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#1A2B47', zIndex: 1300 }}>
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Logo />
          </Box>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button color="inherit" component={Link} to="/about">
                About Us
              </Button>
              <Button color="inherit" component={Link} to="/contact">
                Contact
              </Button>
              <Button color="inherit" component={Link} to="/faq">
                FAQ
              </Button>
              <Button
                color="inherit"
                onClick={handleTutorialsClick}
                sx={{ textTransform: 'none' }}
              >
                Tutorials
              </Button>
              {isAuthenticated ? (
                <>
                  <Button color="inherit" component={Link} to="/dashboard">
                    Dashboard
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={`${user?.firstName} ${user?.lastName}`}
                      avatar={<Avatar sx={{ width: 24, height: 24 }}>{user?.firstName?.[0]}</Avatar>}
                      onClick={handleUserMenuClick}
                      sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.2)' }}
                    />
                    <IconButton
                      color="inherit"
                      onClick={handleUserMenuClick}
                      size="small"
                    >
                      <AccountCircle />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/signup">
                    Sign Up
                  </Button>
                  <Button color="inherit" component={Link} to="/login">
                    User Login
                  </Button>
                </>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Phone sx={{ mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2">833-657-4812</Typography>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={tutorialsAnchor}
        open={Boolean(tutorialsAnchor)}
        onClose={handleTutorialsClose}
      >
        <MenuItem onClick={() => { handleTutorialsClose(); navigate('/tutorials/efiling'); }}>
          E filing Tutorials
        </MenuItem>
        <MenuItem onClick={() => { handleTutorialsClose(); navigate('/tutorials/word'); }}>
          Using Microsoft Word
        </MenuItem>
        <MenuItem onClick={() => { handleTutorialsClose(); navigate('/tutorials/newcase'); }}>
          quickfile.legal New Case
        </MenuItem>
        <MenuItem onClick={() => { handleTutorialsClose(); navigate('/tutorials/install'); }}>
          Installing quickfile.legal
        </MenuItem>
        <MenuItem onClick={() => { handleTutorialsClose(); navigate('/tutorials/acrobat'); }}>
          Using Adobe Acrobat
        </MenuItem>
        <MenuItem onClick={() => { handleTutorialsClose(); navigate('/tutorials/exhibits'); }}>
          Efiling Exhibits
        </MenuItem>
        <MenuItem onClick={() => { handleTutorialsClose(); navigate('/tutorials/dragdrop'); }}>
          Drag and Drop
        </MenuItem>
        <MenuItem onClick={() => { handleTutorialsClose(); navigate('/tutorials/reporting'); }}>
          quickfile.legal Reporting
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={() => { handleUserMenuClose(); navigate('/dashboard'); }}>
          <Dashboard sx={{ mr: 1 }} />
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => { handleUserMenuClose(); navigate('/profile'); }}>
          <Person sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
