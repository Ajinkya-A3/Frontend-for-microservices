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
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

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
      navigate(`/product/${productId}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        //background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
        py: 4,
      }}
    >
      <Navbar />
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          Your Orders
        </Typography>

        {orders.map((order) => (
          <Card
            key={order._id}
            sx={{
              mb: 4,
              p: 2,
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              boxShadow: 6,
              color: "#fff",
              transition: "0.3s",
              "&:hover": {
                boxShadow: 10,
                transform: "scale(1.01)",
              },
            }}
          >
            <CardHeader
              title={`Order ID: ${order._id}`}
              subheader={`Date: ${new Date(order.createdAt).toLocaleString()}`}
              sx={{
                mb: 1,
                background: "linear-gradient(90deg, #3f51b5 0%, #2196f3 50%, #00bcd4 100%)",
                borderRadius: 2,
                px: 2,
                py: 1,
                color: "white",
                "& .MuiCardHeader-subheader": {
                  color: "#e0f7fa",
                },
              }}
            />
            <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

            <CardContent>
              <Grid container spacing={2}>
                {order.items.map((item) => {
                  const product =
                    typeof item.productId === "object" ? item.productId : {};
                  const productName =
                    product?.productName ||
                    item?.productName ||
                    "Unnamed Product";
                  const productImage =
                    product?.productImage ||
                    item?.productImage ||
                    "https://placehold.co/80x80?text=No+Image";
                  const productId =
                    typeof item.productId === "object"
                      ? item.productId._id
                      : item.productId || null;

                  return (
                    <Grid item xs={12} sm={6} md={4} key={item._id}>
                      <Card
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 1.5,
                          borderRadius: 2,
                          cursor: productId ? "pointer" : "default",
                          backgroundColor: "rgba(255,255,255,0.08)",
                          color: "#fff",
                          boxShadow: 3,
                          transition: "0.3s ease-in-out",
                          "&:hover": {
                            boxShadow: 6,
                            transform: "scale(1.015)",
                          },
                        }}
                        onClick={() => handleProductClick(productId)}
                      >
                        <img
                          src={productImage}
                          alt={productName}
                          onError={handleImageError}
                          loading="lazy"
                          style={{
                            width: 80,
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 10,
                            backgroundColor: "#ffffff",
                            padding: 4,
                          }}
                        />
                        <Box ml={2} flex={1}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            sx={{ color: "#212121" }}
                          >
                            {productName}
                          </Typography>
                          <Typography variant="body2" color="#bbdefb">
                            Quantity: {item.quantity}
                          </Typography>
                          <Typography variant="body2" color="#bbdefb">
                            Price: ${item.price}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#e3f2fd" }}
              >
                Total: ${order.totalAmount}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
      <Footer />
    </Box>

  );
};

export default OrdersPage;
