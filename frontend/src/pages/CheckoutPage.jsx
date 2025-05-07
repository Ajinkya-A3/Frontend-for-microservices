import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { toast } from 'react-toastify';
  import axios from 'axios';
  import CartItemCard from '../components/CartItemCard'; // Adjust path if needed
  
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
  
    // State for cart items and loading status
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  
    // Fetch cart items
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get(import.meta.env.VITE_API_CART + '/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
        toast.error('Error fetching cart items');
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch cart items on component mount
    useEffect(() => {
      fetchCart();
    }, []);
  
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
            addressLine2: prev.addressLine2 || info.Block || '',
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
      // API call to checkout service goes here
    };
  
    if (loading) {
      return <Typography>Loading...</Typography>;
    }
  
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Checkout
        </Typography>
  
        {/* 🛒 Cart Items and Address Form */}
        <Grid container spacing={4}>
          {/* Left side: Address */}
          <Grid item xs={12} md={7}>
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
          </Grid>
  
          {/* Right side: Cart Items */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" gutterBottom>
              Your Cart
            </Typography>
            <Grid container spacing={2}>
              {cartItems.map((item, index) => (
                <Grid item xs={12} key={index}>
                  {/* Wrapper to visually scale down the Card */}
                  <Box
                    sx={{
                      transform: 'scale(0.75)',
                      transformOrigin: 'top left',
                      width: '100%',
                    }}
                  >
                    <CartItemCard item={item} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
  