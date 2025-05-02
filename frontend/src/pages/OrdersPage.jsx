import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Dummy order data
    const dummyOrders = [
      {
        _id: 'order1',
        status: 'Delivered',
        createdAt: new Date().toISOString(),
        totalItems: 3,
        totalPrice: 59.99,
      },
      {
        _id: 'order2',
        status: 'Shipped',
        createdAt: new Date().toISOString(),
        totalItems: 2,
        totalPrice: 29.49,
      },
      {
        _id: 'order3',
        status: 'Processing',
        createdAt: new Date().toISOString(),
        totalItems: 1,
        totalPrice: 15.99,
      },
    ];
    setOrders(dummyOrders);
  }, []);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, px: { xs: 2, sm: 4, md: 6 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            color: '#1e88e5',
          }}
        >
          Your Orders
        </Typography>

        {orders.length === 0 ? (
          <Typography variant="h6" color="text.secondary" align="center">
            You have no orders yet.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {orders.map((order, index) => (
              <Grid item xs={12} sm={6} md={4} key={order._id}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    boxShadow: 6,
                    bgcolor: '#f9f9ff',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 10,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                      Order #{order._id.slice(-5)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Items: <strong>{order.totalItems}</strong>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Total: <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color:
                          order.status === 'Delivered'
                            ? 'green'
                            : order.status === 'Shipped'
                              ? 'orange'
                              : '#1976d2',
                        fontWeight: 'bold',
                      }}
                    >
                      Status: {order.status}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                      Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        borderColor: '#1e88e5',
                        color: '#1e88e5',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                        },
                      }}
                      onClick={() => alert(`Viewing details for ${order._id}`)}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
}
