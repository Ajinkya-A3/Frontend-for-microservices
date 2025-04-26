import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, ListItemIcon, Divider } from '@mui/material';
import { AccountCircle, Info, ShoppingCart, Assignment, Logout } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
        background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>

        {/* Logo Section */}
        <Typography
          variant="h5"
          onClick={() => navigate('/home')}
          sx={{
            fontWeight: 'bold',
            cursor: 'pointer',
            color: 'white',
            letterSpacing: 1,
          }}
        >
          🛒 MyShop
        </Typography>

        {/* Profile Icon Section */}
        <Box>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleMenu}
            sx={{
              transition: '0.3s',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <AccountCircle fontSize="large" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ mt: 1 }}
          >
            <MenuItem onClick={() => handleClose('/about')}>
              <ListItemIcon>
                <Info fontSize="small" />
              </ListItemIcon>
              About Me
            </MenuItem>
            <MenuItem onClick={() => handleClose('/cart')}>
              <ListItemIcon>
                <ShoppingCart fontSize="small" />
              </ListItemIcon>
              Cart
            </MenuItem>
            <MenuItem onClick={() => handleClose('/orders')}>
              <ListItemIcon>
                <Assignment fontSize="small" />
              </ListItemIcon>
              Orders
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
