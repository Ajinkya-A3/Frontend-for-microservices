import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

const ProductDetailsCard = ({ product }) => {
    const placeholderImage = 'https://media.extra.com/s/aurora/100315775_800/Apple-iPhone-14-Pro-Max%2C-5G%2C-128GB%2C-Space-Black?locale=en-GB,en-*,*';
    return (
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
                    sx={{
                        mt: 3,
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                            transform: 'scale(1.02)',
                        },
                        transition: 'all 0.3s ease-in-out',
                    }}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductDetailsCard;
