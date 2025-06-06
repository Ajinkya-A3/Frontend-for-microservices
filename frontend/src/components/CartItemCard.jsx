import {
    Card,
    CardContent,
    CardMedia,
    Box,
    Typography,
    Button,
    Stack,
    TextField,
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  const placeholderImage = 'https://placehold.co/300x200?text=Product+Image';
  
  export default function CartItemCard({ item, updating, onQuantityChange, onRemove, onCartRefresh }) {
    const handleBuyNow = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User not authenticated');
        return;
      }
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_ORDER}/single`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: item.productId,
            quantity: item.quantity,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          toast.success('Order placed successfully!');
          if (onCartRefresh) {
            await onCartRefresh();
          }
        } else {
          toast.error(data.message || 'Failed to place order');
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    };
  
    return (
      <>
        <Card
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'stretch',
            height: 200,
            width:650,
            boxShadow: 6,
            borderRadius: 3,
            overflow: 'hidden',
            p: 2,
            bgcolor: '#fdfdfd',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: '100%', sm: 250 },
              height: '100%',
              objectFit: 'cover',
              borderRadius: 2,
            }}
            image={item.image || placeholderImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderImage;
            }}
            alt={item.name}
          />
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {item.name}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  mb: 2,
                  fontSize: 14,
                  lineHeight: '1.4em',
                  maxHeight: '4.2em',
                }}
              >
                {item.description}
              </Typography>
              <Typography variant="h6" color="primary">
                Price: ${item.price.toFixed(2)}
              </Typography>
            </CardContent>
            <Box
              sx={{
                px: 2,
                pb: 2,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'flex-end',
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
                  onChange={(e) =>
                    onQuantityChange(item.productId, Math.max(1, parseInt(e.target.value)))
                  }
                  disabled={updating}
                  InputProps={{ inputProps: { min: 1 } }}
                  sx={{
                    width: 100,
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      backgroundColor: '#f0f4ff',
                      border: '1px solid #90caf9',
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Button
                  onClick={() => onRemove(item.productId)}
                  startIcon={<DeleteIcon />}
                  sx={{
                    color: '#f44336',
                    border: '1px solid #f44336',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#ffe6e6',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          </Box>
        </Card>
        <ToastContainer />
      </>
    );
  }
  