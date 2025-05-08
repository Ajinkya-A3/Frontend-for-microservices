import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutForm from '../components/CheckoutForm';
import CartSummary from '../components/CartSummary';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_CART, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setCartItems(data.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdating(true);
    try {
      await fetch(`${import.meta.env.VITE_API_CART}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, quantity: newQuantity }),
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    setUpdating(true);
    try {
      await fetch(`${import.meta.env.VITE_API_CART}/remove/${itemId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Typography variant="h4" gutterBottom>Checkout</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CheckoutForm cartItems={cartItems} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CartSummary
              cartItems={cartItems}
              updating={updating}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
              fetchCart={fetchCart}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CheckoutPage;
