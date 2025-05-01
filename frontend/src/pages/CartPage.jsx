import { useEffect, useState } from 'react';
import {
  Container, Typography, Card, CardContent, Grid, CircularProgress,
  Box, CardMedia, TextField, Button, Stack, IconButton
} from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';

const placeholderImage = 'https://placehold.co/200x150?text=Product+Image';

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
    // Placeholder logic - replace with your Buy API logic
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
      fetchCart(); // Re-fetch the cart after emptying it
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
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>
        
        {/* Empty Cart Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton color="error" onClick={handleEmptyCart}>
            <DeleteIcon />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Empty Cart
            </Typography>
          </IconButton>
        </Box>

        {cartItems.length === 0 ? (
          <Typography>No items in cart.</Typography>
        ) : (
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} md={6} key={item._id}>
                <Card sx={{ display: 'flex', boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 200 }}
                    image={item.image || placeholderImage} // Use image from API, fallback to placeholder
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                    alt={item.name}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                      <Typography sx={{ mt: 1 }}>Price: ${item.price.toFixed(2)}</Typography>

                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
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
                          sx={{ width: 90 }}
                        />
                        <Button color="error" variant="outlined" onClick={() => handleRemove(item.productId)}>
                          Remove
                        </Button>
                        <Button variant="contained" onClick={() => handleBuyNow(item)}>
                          Buy Now
                        </Button>
                      </Stack>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
