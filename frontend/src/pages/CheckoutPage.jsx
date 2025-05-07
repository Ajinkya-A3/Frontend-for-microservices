import React, { useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  Button,
  MenuItem,
  Grid,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const CheckoutPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePostalCodeBlur = async () => {
    if (!form.postalCode || form.postalCode.length !== 6) return;

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${form.postalCode}`);
      const data = await res.json();

      if (data[0].Status === 'Success') {
        const postOffice = data[0].PostOffice[0];
        const block = postOffice.Block;

        setForm((prev) => ({
          ...prev,
          city: postOffice.District,
          state: postOffice.State,
          addressLine2: prev.addressLine2
            ? prev.addressLine2
            : block ? `Block: ${block}` : '',
        }));
      } else {
        toast.error('Invalid Postal Code');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch postal info');
    }
  };

  const handleBuyAll = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_ORDER}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shippingAddress: form }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Order placed successfully!');
        navigate('/home');
      } else {
        toast.error(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error placing order');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 1"
            name="addressLine1"
            value={form.addressLine1}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 2 (Optional)"
            name="addressLine2"
            value={form.addressLine2}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Postal Code"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            onBlur={handlePostalCodeBlur}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
          >
            {INDIAN_STATES.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
            disabled
          />
        </Grid>
      </Grid>

      <Button
        fullWidth
        onClick={handleBuyAll}
        sx={{
          mt: 3,
          textTransform: 'none',
          fontWeight: 'bold',
          color: '#fff',
          px: 3,
          py: 1.2,
          borderRadius: 3,
          background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 50%, #00bcd4 100%)',
          boxShadow: 3,
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#2196f3',
          },
        }}
      >
        Proceed to Buy
      </Button>
    </Box>
  );
};

export default CheckoutPage;
