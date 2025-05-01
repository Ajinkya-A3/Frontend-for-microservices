import { useEffect, useState } from 'react';
import Footer from '../components/Footer';

import {
  Container, Typography, Card, CardContent, Grid, CircularProgress,
  Box, CardMedia, TextField, Button, Stack, IconButton
} from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';

const placeholderImage = 'https://placehold.co/300x200?text=Product+Image';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(import.meta.env.VITE_API_CART + '/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (productId, newQty) => {
    try {
      setUpdating(true);
      await axios.put(`${import.meta.env.VITE_API_CART}/update/${productId}`, {
        quantity: newQty,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      await axios.delete(`${import.meta.env.VITE_API_CART}/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const handleBuyNow = (item) => {
    console.log('Buying item:', item);
    alert(`Proceeding to buy "${item.name}"`);
  };

  const handleEmptyCart = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_CART}/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (err) {
      console.error('Error emptying the cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

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
      <Container sx={{ mt: 4, px: { xs: 1, sm: 2, md: 4 } }}>
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              textAlign: { xs: 'center', sm: 'left' },
              width: { xs: '100%', sm: 'auto' },
              mb: { xs: 2, sm: 0 },
            }}
          >
            Your Cart
          </Typography>

          <IconButton
            color="error"
            onClick={handleEmptyCart}
            sx={{
              border: '1px solid #f44336',
              px: 2,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#ffe6e6',
              },
            }}
          >
            <DeleteIcon />
            <Typography variant="body2" sx={{ fontWeight: 'bold', ml: 1 }}>
              Empty Cart
            </Typography>
          </IconButton>
        </Box>

        {cartItems.length === 0 ? (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 6 }}>
            No items in cart.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {cartItems.map((item) => (
              <Grid item xs={12} sm={10} md={9} lg={8} key={item._id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'stretch',
                    boxShadow: 6,
                    borderRadius: 3,
                    overflow: 'hidden',
                    p: { xs: 1, sm: 2 },
                    bgcolor: '#fdfdfd',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: '100%', sm: 300 },
                      height: { xs: 200, sm: 250 },
                      objectFit: 'cover',
                      borderRadius: 2,
                      mr: { sm: 3 },
                    }}
                    image={item.image || placeholderImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholderImage;
                    }}
                    alt={item.name}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                    <CardContent>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {item.description}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        Price: ${item.price.toFixed(2)}
                      </Typography>
                    </CardContent>

                    <Box
                      sx={{
                        mt: 2,
                        px: 2,
                        pb: 2,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <TextField
                          type="number"
                          label="Qty"
                          size="small"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.productId, Math.max(1, parseInt(e.target.value)))
                          }
                          disabled={updating}
                          InputProps={{ inputProps: { min: 1 } }}
                          sx={{ width: 100 }}
                        />
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={() => handleRemove(item.productId)}
                          sx={{ textTransform: 'none' }}
                        >
                          Remove
                        </Button>
                      </Stack>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleBuyNow(item)}
                        sx={{ textTransform: 'none', width: { xs: '100%', sm: 'auto' } }}
                      >
                        Buy Now
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
}
