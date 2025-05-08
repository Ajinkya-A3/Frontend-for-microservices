import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import CartItemCard from './CartItemCard';

const CartSummary = ({ cartItems, updating, onQuantityChange, onRemove, fetchCart }) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                px: 2,
                my: 4,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: 1000,
                    p: 4,
                    borderRadius: 3,
                    background: '#f9fafc',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        borderBottom: '2px solid #1976d2',
                        pb: 1,
                        mb: 3,
                        color: '#1976d2',
                        textAlign: 'center',
                    }}
                >
                    🛒 Your Cart
                </Typography>

                {cartItems.length === 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 150,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="body1" color="text.secondary">
                            Your cart is empty. Start adding some amazing products!
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3} justifyContent="center">
                        {cartItems.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item._id}>
                                <CartItemCard
                                    item={item}
                                    updating={updating}
                                    onQuantityChange={onQuantityChange}
                                    onRemove={onRemove}
                                    onCartRefresh={fetchCart}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default CartSummary;
