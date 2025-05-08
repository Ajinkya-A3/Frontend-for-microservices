import { Box, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    style: {
        background: '#121212',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '15px',
        borderRadius: '8px',
    },
    progressStyle: {
        background: '#00e676',
    },
};

export default function CartHeader({ onEmpty }) {
    const navigate = useNavigate();

    const handleEmptyCart = async () => {
        try {
            await onEmpty();
            toast.success('Cart is now empty', toastOptions);
        } catch (error) {
            toast.error('Failed to empty cart', toastOptions);
        }
    };

    const handleBuyAll = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('User not authenticated', toastOptions);
            return;
        }

        // Navigate to the checkout page
        navigate('/checkout');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: { xs: 'center', sm: 'left' },
                    width: { xs: '100%', sm: 'auto' },
                }}
            >
                Your Cart
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                    onClick={handleBuyAll}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        color: '#fff',
                        px: 3,
                        py: 1.2,
                        borderRadius: 3,
                        background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 50%, #00bcd4 100%)',
                        backgroundSize: '200%',
                        transition: 'all 0.4s ease',
                        boxShadow: 3,
                        '&:hover': {
                            transform: 'scale(1.05)',
                            backgroundPosition: 'right',
                            background: 'linear-gradient(90deg, #00bcd4 0%, #2196f3 50%, #3f51b5 100%)',
                        },
                    }}
                >
                    Proceed to Checkout
                </Button>

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
        </Box>
    );
}
