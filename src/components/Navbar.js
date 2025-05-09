import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from '../components/SearchBar';
import { useTheme } from '@mui/material/styles';

const Navbar = ({ onSearch, toggleMode, mode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setDrawerOpen(false);
    navigate('/login');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: mode === 'dark' ? '#121212' : '#003366',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            Movie Explorer
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isSmallScreen && (
              <Box sx={{ mx: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ maxWidth: 500, flexGrow: 1 }}>
                  <SearchBar onSearch={onSearch} />
                </Box>
              </Box>
            )}

            <Tooltip title="Toggle Light/Dark Mode">
              <IconButton
                onClick={toggleMode}
                sx={{
                  ml: 1,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'background.paper',
                  boxShadow: 3,
                  transition: 'transform 0.3s, background-color 0.3s',
                  '&:hover': {
                    transform: 'rotate(20deg) scale(1.1)',
                    bgcolor: '#6495ED',
                    color: 'white',
                  },
                }}
              >
                {mode === 'dark' ? (
                  <LightModeIcon sx={{ fontSize: 24 }} />
                ) : (
                  <DarkModeIcon sx={{ fontSize: 24 }} />
                )}
              </IconButton>
            </Tooltip>

            {isSmallScreen ? (
              <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  ml: 1,
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: '0.3s',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/home">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/favorites">
                  Favorites
                </Button>
                {isAuthenticated ? (
                  <>
                    <IconButton
                      size="large"
                      edge="end"
                      color="inherit"
                      onClick={handleMenu}
                      sx={{
                        ml: 1,
                        '&:hover': {
                          transform: 'rotate(10deg) scale(1.1)',
                          transition: '0.3s',
                        },
                      }}
                    >
                      <AccountCircleIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleCloseMenu();
                          navigate('/profile');
                        }}
                      >
                        Profile
                      </MenuItem>
                      
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                )}
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for small screens */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#003366',
            width: 240,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Menu
          </Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)' }} />
        <List>
          <ListItem button component={Link} to="/" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Home" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem button component={Link} to="/favorites" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Favorites" sx={{ color: 'white' }} />
          </ListItem>
          {isAuthenticated ? (
            <>
              <ListItem button component={Link} to="/profile" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Profile" sx={{ color: 'white' }} />
              </ListItem>
              <ListItem button component={Link} to="/settings" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Settings" sx={{ color: 'white' }} />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" sx={{ color: 'white' }} />
              </ListItem>
            </>
          ) : (
            <ListItem button component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Login" sx={{ color: 'white' }} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
