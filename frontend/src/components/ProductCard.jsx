// src/components/ProductCard.jsx

import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageViewModal from './ImageViewModal'; // Import the ImageViewModal

const placeholderImage = 'https://media.extra.com/s/aurora/100315775_800/Apple-iPhone-14-Pro-Max%2C-5G%2C-128GB%2C-Space-Black?locale=en-GB,en-*,*';

export default function ProductCard({ product, handleAddToCart }) {
    const navigate = useNavigate();
    const [openImageModal, setOpenImageModal] = useState(false); // Modal state
    const [modalImageUrl, setModalImageUrl] = useState(''); // Store image URL for modal

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    const handleImageClick = () => {
        setModalImageUrl(placeholderImage); // Set the image for the modal
        setOpenImageModal(true); // Open the image modal
    };

    const handleCloseModal = () => {
        setOpenImageModal(false); // Close the image modal
    };

    return (
        <>
            <Card
                sx={{
                    width: 250,
                    height: 450,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: '0.3s',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    border: '1px solid #ddd', // Adding a border to the card
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 6,
                    },
                }}
            >
                <Box onClick={handleCardClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Card Image */}
                    <CardMedia
                        component="img"
                        image={placeholderImage}
                        alt={product.name}
                        onClick={handleImageClick} // Click on the image to open modal
                        sx={{
                            height: 180,
                            objectFit: 'cover',
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            cursor: 'zoom-in', // Cursor change to indicate zoom action
                        }}
                    />
                    <CardContent
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: 2,
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
                                    lineHeight: 1.3,
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
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
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
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            padding: '12px',
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

            {/* Image View Modal */}
            <ImageViewModal open={openImageModal} imageUrl={modalImageUrl} onClose={handleCloseModal} />
        </>
    );
}
