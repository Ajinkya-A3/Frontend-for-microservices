import { Box, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartHeader({ onBuyAll, onEmpty }) {
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
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', textAlign: { xs: 'center', sm: 'left' }, width: { xs: '100%', sm: 'auto' } }}>
                Your Cart
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                    onClick={onBuyAll}
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
                    onClick={onEmpty}
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
