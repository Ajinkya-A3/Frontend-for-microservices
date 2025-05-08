import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import CartItemCard from '../components/CartItemCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
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

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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

  const handleBuyNow = async () => {
    if (!token) {
      toast.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_ORDER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ shippingAddress: form }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Order placed successfully!');
        navigate('/orders');
      } else {
        toast.error(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  const handleQuantityChange = async (productId, newQty) => {
    if (!token) return toast.error('User not authenticated');

    const safeQty = parseInt(newQty);
    if (isNaN(safeQty) || safeQty < 1) {
      toast.error('Invalid quantity');
      return;
    }

    setUpdating(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_CART}/update/${productId}`,
        { quantity: safeQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Quantity updated');
      fetchCart();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update quantity');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    if (!token) return toast.error('User not authenticated');
    setUpdating(true);

    try {
      await axios.delete(`${import.meta.env.VITE_API_CART}/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Item removed from cart');
      fetchCart();
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove item');
    } finally {
      setUpdating(false);
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const totalAmount = calculateTotalAmount();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Navbar />

      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4, minHeight: '80vh' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Checkout
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12}><TextField fullWidth label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} required /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Address Line 1" name="addressLine1" value={form.addressLine1} onChange={handleChange} required /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Address Line 2 (Optional)" name="addressLine2" value={form.addressLine2} onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="City" name="city" value={form.city} onChange={handleChange} required /></Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="State" name="state" value={form.state} onChange={handleChange} select required>
                    {INDIAN_STATES.map((state) => (
                      <MenuItem key={state} value={state}>{state}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Pincode" name="postalCode" value={form.postalCode} onChange={handleChange} onBlur={handlePincodeBlur} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Country" name="country" value={form.country} disabled />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleBuyNow}
                    disabled={loading}
                    sx={{
                      mt: 3,
                      borderRadius: 2,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      color: 'white',
                      background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 50%, #00bcd4 100%)',
                      backgroundSize: '200%',
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        backgroundPosition: 'right',
                        background: 'linear-gradient(90deg, #00bcd4 0%, #2196f3 50%, #3f51b5 100%)',
                      },
                      '&:disabled': {
                        cursor: 'not-allowed',
                      },
                    }}
                  >
                    Proceed to Pay ${totalAmount.toFixed(2)}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography variant="h6" gutterBottom>Your Cart</Typography>
            <Grid container spacing={2}>
              {cartItems.map((item) => (
                <Grid item xs={12} key={item._id}>
                  <Box sx={{ transform: 'scale(0.8)', transformOrigin: 'top left' }}>
                    <CartItemCard
                      item={item}
                      updating={updating}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                      onCartRefresh={fetchCart}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </>
  );
}
