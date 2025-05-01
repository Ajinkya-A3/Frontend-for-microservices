import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import SnackbarComponent from './SnackbarComponent';

const ProductDetailsCard = ({ product }) => {
    const [cartSuccess, setCartSuccess] = useState(false);
    const [error, setError] = useState('');

    const placeholderImage = 'https://media.extra.com/s/aurora/100315775_800/Apple-iPhone-14-Pro-Max%2C-5G%2C-128GB%2C-Space-Black?locale=en-GB,en-*,*';

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to add items to your cart.');
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_API_CART}/add`,
                {
                    productId: product._id,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCartSuccess(true);
        } catch (err) {
            console.error('Error adding to cart:', err);
            setError('Failed to add product to cart.');
        }
    };

    return (
        <>
            <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
                <CardMedia
                    component="img"
                    image={placeholderImage}
                    alt={product.name}
                    sx={{
                        width: '100%',
                        height: { xs: 250, sm: 400 },
                        objectFit: 'contain',
                        backgroundColor: '#f5f5f5',
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        p: 2,
                    }}
                />
                <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        {product.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 3 }}>
                        <Typography variant="h6" color="primary">
                            Price: ${product.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Stock: {product.stock_quantity}
                        </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Category: {product.category}
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        disabled={product.stock_quantity === 0}
                        onClick={handleAddToCart}
                        sx={{
                            mt: 3,
                            borderRadius: 2,
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            color: 'white',
                            background: product.stock_quantity === 0
                                ? 'gray'
                                : 'linear-gradient(90deg, #3f51b5 0%, #2196f3 50%, #00bcd4 100%)',
                            backgroundSize: '200%',
                            transition: 'all 0.4s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                backgroundPosition: 'right',
                                background: product.stock_quantity === 0
                                    ? 'gray'
                                    : 'linear-gradient(90deg, #00bcd4 0%, #2196f3 50%, #3f51b5 100%)',
                            },
                            '&:disabled': {
                                cursor: 'not-allowed',
                            },
                        }}
                    >
                        {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                </CardContent>
            </Card>

            {/* Snackbar Alerts */}
            <SnackbarComponent
                open={cartSuccess}
                onClose={() => setCartSuccess(false)}
                severity="success"
                message="Product added to cart!"
                autoHideDuration={1500}
            />

            {error && (
                <SnackbarComponent
                    open={Boolean(error)}
                    onClose={() => setError('')}
                    severity="error"
                    message={error}
                    autoHideDuration={2000}
                />
            )}
        </>
    );
};

export default ProductDetailsCard;
