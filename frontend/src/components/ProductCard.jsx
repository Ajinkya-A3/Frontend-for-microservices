import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    CardMedia,
    Tooltip,
    Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageViewModal from './ImageViewModal';

const placeholderImage = 'https://media.extra.com/s/aurora/100315775_800/Apple-iPhone-14-Pro-Max%2C-5G%2C-128GB%2C-Space-Black?locale=en-GB,en-*,*';

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const [openImageModal, setOpenImageModal] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    const handleImageClick = (e) => {
        e.stopPropagation();
        setModalImageUrl(product.image || placeholderImage);
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
            boxShadow: 3,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            m: 1,
            backgroundColor: '#fff',
            '&:hover': {
                transform: 'scale(1.03)',
            boxShadow: 6,
                    },
                }}
            >
            <Box onClick={handleCardClick} sx={{ flexGrow: 1 }}>
                <CardMedia
                    component="img"
                    image={product.image || placeholderImage}
                    alt={product.name}
                    onClick={handleImageClick}
                    sx={{
                        height: 260, // Increased height
                        objectFit: 'contain', // Show full image
                        cursor: 'zoom-in',
                        backgroundColor: '#f5f5f5', // Optional: subtle background
                        p: 1, // Padding around the image for better spacing
                        borderBottom: '1px solid #eee',
                    }}
                />

                <CardContent
                    sx={{
                        px: 2,
                        py: 1.5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.8,
                    }}
                >
                    <Tooltip title={product.name}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {product.name}
                        </Typography>
                    </Tooltip>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontStyle: 'italic', fontSize: '0.75rem' }}
                    >
                        {product.category}
                    </Typography>

                    <Tooltip title={product.description}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                fontSize: '0.85rem',
                                lineHeight: 1.4,
                            }}
                        >
                            {product.description}
                        </Typography>
                    </Tooltip>

                    <Box mt={1}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="primary"
                            sx={{ fontSize: '1.1rem' }}
                        >
                            ${product.price}
                        </Typography>
                        <Chip
                            label={
                                product.stock_quantity > 0
                                    ? `In Stock: ${product.stock_quantity}`
                                    : 'Out of Stock'
                            }
                            color={product.stock_quantity > 0 ? 'success' : 'default'}
                            size="small"
                            sx={{ mt: 0.5 }}
                        />
                    </Box>
                </CardContent>
            </Box>
        </Card >

            <ImageViewModal
                open={openImageModal}
                imageUrl={modalImageUrl}
                onClose={handleCloseModal}
            />
        </>
    );
}
