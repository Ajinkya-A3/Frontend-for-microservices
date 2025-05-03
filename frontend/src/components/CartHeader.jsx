import { Box, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

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
    const handleEmptyCart = async () => {
        try {
            await onEmpty();
            toast.success('Cart is now empty', toastOptions);
        } catch (error) {
            toast.error('Failed to empty cart', toastOptions);
        }
    };

    const handleBuyAll = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('User not authenticated', toastOptions);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_ORDER}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Order placed for all items!', toastOptions);
                await onEmpty(); // Clear cart after placing order
            } else {
                toast.error(data.message || 'Failed to place order', toastOptions);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Something went wrong while placing the order', toastOptions);
        }
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
                        boxShadow: 3,
                        '&:hover': {
                            transform: 'scale(1.05)',
                            backgroundColor: '#2196f3',
                        },
                    }}
                >
                    Buy Entire Cart
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
