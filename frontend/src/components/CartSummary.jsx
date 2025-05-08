import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CartItemCard from './CartItemCard';

const CartSummary = ({ cartItems, updating, onQuantityChange, onRemove, fetchCart }) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>Your Cart</Typography>
            <Grid container spacing={2}>
                {cartItems.map((item) => (
                    <Grid item xs={12} key={item._id}>
                        <Box sx={{ transform: 'scale(0.95)', transformOrigin: 'top left' }}>
                            <CartItemCard
                                item={item}
                                updating={updating}
                                onQuantityChange={onQuantityChange}
                                onRemove={onRemove}
                                onCartRefresh={fetchCart}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default CartSummary;
