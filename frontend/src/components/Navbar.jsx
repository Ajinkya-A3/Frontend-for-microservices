import {
  AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box,
  ListItemIcon, Divider, Tooltip
} from '@mui/material';
import {
  AccountCircle, Info, ShoppingCart, Assignment, Logout
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 50%, #00bcd4 100%)',
        boxShadow: 4,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 3 } }}>

        {/* Logo / Brand */}
        <Typography
          variant="h5"
          onClick={() => navigate('/home')}
          sx={{
            fontWeight: 700,
            cursor: 'pointer',
            color: '#fff',
            letterSpacing: 2,
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          🛒 KubeCart
        </Typography>

        {/* Profile Icon */}
        <Box>
          <Tooltip title="Account Menu">
            <IconButton
              onClick={handleMenu}
              size="large"
              sx={{
                color: '#fff',
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <AccountCircle fontSize="large" />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ mt: 1 }}
          >
            <MenuItem onClick={() => handleClose('/about')}>
              <ListItemIcon><Info fontSize="small" /></ListItemIcon>
              About Me
            </MenuItem>
            <MenuItem onClick={() => handleClose('/cart')}>
              <ListItemIcon><ShoppingCart fontSize="small" /></ListItemIcon>
              Cart
            </MenuItem>
            <MenuItem onClick={() => handleClose('/orders')}>
              <ListItemIcon><Assignment fontSize="small" /></ListItemIcon>
              Orders
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
