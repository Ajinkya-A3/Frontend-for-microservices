import {
    Card, CardMedia, CardContent, Typography,
    Box, Stack, TextField, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import placeholderImage from '../assets/placeholderImage'; // Or use URL directly

const placeholderImage = "https://via.placeholder.com/300x250?text=No+Image";

const CartItemCard = ({ item, onQuantityChange, onRemove, onBuyNow, updating }) => {
    const handleImageError = (e) => {
        e.target.src = placeholderImage;
    };

    return (
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
                onError={handleImageError}
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
                        Price: ${(item.price * item.quantity).toFixed(2)}
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
                            onChange={(e) => onQuantityChange(item.productId, Math.max(1, parseInt(e.target.value)))}
                            disabled={updating}
                            InputProps={{ inputProps: { min: 1 } }}
                            sx={{ width: 100 }}
                        />
                        <Button
                            variant="outlined"
                            onClick={() => onRemove(item.productId)}
                            startIcon={<DeleteIcon />}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                color: '#f44336',
                                borderColor: '#f44336',
                                transition: '0.3s',
                                '&:hover': {
                                    backgroundColor: '#ffe6e6',
                                    borderColor: '#d32f2f',
                                },
                            }}
                        >
                            Remove
                        </Button>
                    </Stack>
                    <Button
                        variant="contained"
                        onClick={() => onBuyNow(item)}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            color: 'white',
                            width: { xs: '100%', sm: 'auto' },
                            background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 50%, #00bcd4 100%)',
                            backgroundSize: '200%',
                            transition: 'all 0.4s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                backgroundPosition: 'right',
                            },
                        }}
                    >
                        Buy Now
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default CartItemCard;
