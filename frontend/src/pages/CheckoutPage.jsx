import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography,
  } from '@mui/material';
  import { useState } from 'react';
  import { toast } from 'react-toastify';
  
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
  
  export default function CheckoutPage() {
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
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handlePincodeBlur = async () => {
      if (form.postalCode.length !== 6) return;
  
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${form.postalCode}`);
        const data = await res.json();
        const info = data[0]?.PostOffice?.[0];
  
        if (info) {
          setForm((prev) => ({
            ...prev,
            city: info.District || '',
            state: info.State || '',
            addressLine2: prev.addressLine2 || info.Block || '',  // Only add Block info to Address Line 2
          }));
        } else {
          toast.error('Invalid Pincode');
        }
      } catch (error) {
        toast.error('Failed to fetch address info from pincode');
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Shipping Address:', form);
      toast.success('Order submitted! (mock)');
      // Implement your API call to checkout service here
    };
  
    return (
      <Box sx={{ maxWidth: 700, mx: 'auto', p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Checkout
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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
                placeholder="House number, Apartment, etc."
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 2 (Optional)"
                name="addressLine2"
                value={form.addressLine2}
                onChange={handleChange}
                placeholder="Block, Sector, etc."
              />
            </Grid>
  
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </Grid>
  
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                select
                required
                sx={{ minWidth: 200 }}
              >
                {INDIAN_STATES.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
  
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                onBlur={handlePincodeBlur}
                required
              />
            </Grid>
  
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
                disabled
              />
            </Grid>
  
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
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
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  }
  