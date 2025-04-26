import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
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
    // Clear token and redirect to login
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
          🛒 MyShop
        </Typography>

        <div>
          <IconButton size="large" color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose()}>
            <MenuItem onClick={() => handleClose('/about')}>About Me</MenuItem>
            <MenuItem onClick={() => handleClose('/cart')}>Cart</MenuItem>
            <MenuItem onClick={() => handleClose('/orders')}>Orders</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
