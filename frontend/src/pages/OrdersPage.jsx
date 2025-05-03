import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(import.meta.env.VITE_API_ORDER, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/80x80?text=No+Image";
  };

  const handleProductClick = (productId) => {
    if (productId) {
      console.log("Navigating to product:", productId);
      navigate(`/product/${productId}`);
    } else {
      console.warn("Product ID not found");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>

      {orders.map((order) => (
        <Card key={order._id} sx={{ mb: 4, p: 2 }}>
          <CardHeader
            title={`Order ID: ${order._id}`}
            subheader={`Date: ${new Date(order.createdAt).toLocaleString()}`}
          />
          <Divider />

          <CardContent>
            <Grid container spacing={2}>
              {order.items.map((item) => {
                const product =
                  typeof item.productId === "object" ? item.productId : {};
                const productName =
                  item.productName || product.productName || "Unnamed Product";
                const productImage =
                  item.productImage ||
                  product.productImage ||
                  "https://placehold.co/80x80?text=No+Image";
                const productId =
                  product._id ||
                  (typeof item.productId === "string"
                    ? item.productId
                    : null);

                return (
                  <Grid item xs={12} md={6} lg={4} key={item._id}>
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        cursor: productId ? "pointer" : "default",
                        transition: "0.2s",
                        "&:hover": {
                          boxShadow: productId ? 6 : undefined,
                        },
                      }}
                      onClick={() => handleProductClick(productId)}
                    >
                      <img
                        src={productImage}
                        alt={productName}
                        onError={handleImageError}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                      <Box ml={2}>
                        <Typography variant="subtitle1">
                          {productName}
                        </Typography>
                        <Typography variant="body2">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body2">
                          Price: ${item.price }
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Total: ${order.totalAmount}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default OrdersPage;
