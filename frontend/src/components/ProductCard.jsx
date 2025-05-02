// src/components/ProductCard.jsx

import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageViewModal from './ImageViewModal';

const placeholderImage = 'https://media.extra.com/s/aurora/100315775_800/Apple-iPhone-14-Pro-Max%2C-5G%2C-128GB%2C-Space-Black?locale=en-GB,en-*,*';

export default function ProductCard({ product, handleAddToCart }) {
    const navigate = useNavigate();
    const [openImageModal, setOpenImageModal] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    const handleImageClick = (e) => {
        e.stopPropagation(); // Prevent card click
        setModalImageUrl(placeholderImage);
        setOpenImageModal(true);
    };

    const handleCloseModal = () => {
        setOpenImageModal(false);
    };

    return (
        <>
            <Card
                sx={{
                    width: { xs: '100%', sm: 280, md: 300 },
                    height: 480,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 4,
                    boxShadow: 4,
                    transition: '0.3s',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    border: '1px solid #ccc',
                    m: 1,
                    '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 6,
                    },
                }}
            >
                <Box onClick={handleCardClick} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardMedia
                        component="img"
                        image={placeholderImage}
                        alt={product.name}
                        onClick={handleImageClick}
                        sx={{
                            height: 200,
                            objectFit: 'cover',
                            cursor: 'zoom-in',
                        }}
                    />
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            flexGrow: 1,
                            p: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    fontSize: '1.1rem',
                                }}
                            >
                                {product.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    mt: 0.5,
                                    fontSize: '0.9rem',
                                }}
                            >
                                {product.category}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    mt: 1,
                                    fontSize: '0.85rem',
                                }}
                            >
                                {product.description}
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    mt: 1,
                                    color: 'primary.main',
                                    fontSize: '1.2rem',
                                }}
                            >
                                ${product.price}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                Stock: {product.stock_quantity}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
                <Box p={1}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock_quantity === 0}
                        sx={{
                            borderRadius: 3,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            py: 1.5,
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
                </Box>
            </Card>

            <ImageViewModal open={openImageModal} imageUrl={modalImageUrl} onClose={handleCloseModal} />
        </>
    );
}
