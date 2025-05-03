import { useEffect, useState } from 'react';
import { Container, CircularProgress, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartHeader from '../components/CartHeader';
import CartItemCard from '../components/CartItemCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
  position: 'top-right',
  autoClose: 3000,
  style: {
    background: '#121212',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '8px',
  },
  progressStyle: {
    background: '#00e676',
  },
};

const toastErrorOptions = {
  ...toastOptions,
  progressStyle: {
    background: '#f44336',
  },
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newQty) => {
    try {
      setUpdating(true);
      await axios.put(`${import.meta.env.VITE_API_CART}/update/${productId}`, { quantity: newQty }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      setUpdating(true);
      await axios.delete(`${import.meta.env.VITE_API_CART}/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart();
      toast.success('Item removed', toastOptions);
    } catch (err) {
      console.error('Error removing item:', err);
      toast.error('Failed to remove item', toastErrorOptions);
    } finally {
      setUpdating(false);
    }
  };

  const handleBuyNow = (item) => {
    toast.success(`Proceeding to buy "${item.name}"`, toastOptions);
  };

  const handleEmptyCart = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_CART}/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // Refetch the cart
      toast.success('Cart is now empty', toastOptions); // Success toast
    } catch (err) {
      console.error('Error emptying the cart:', err);
      toast.error('Failed to empty cart', toastErrorOptions); // Error toast
    }
  };


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Container sx={{ mt: 4, px: { xs: 1, sm: 2, md: 4 } }}>
        <CartHeader onBuyAll={() => toast.success('Buying entire cart', toastOptions)} onEmpty={handleEmptyCart} />
        {cartItems.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 6 }} color="text.secondary">
            No items in cart.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {cartItems.map((item) => (
              <Grid item xs={12} sm={10} md={9} lg={8} key={item._id}>
                <CartItemCard
                  item={item}
                  updating={updating}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                  onBuyNow={handleBuyNow}
                  onCartRefresh={fetchCart}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
}
