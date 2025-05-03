import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import OrderCard from "../components/OrderCard.jsx";

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
    <Box sx={{ minHeight: "100vh", py: 4 }}>
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
          <OrderCard
            key={order._id}
            order={order}
            onProductClick={handleProductClick}
            onImageError={handleImageError}
          />
        ))}
      </Container>
      <Footer />
    </Box>
  );
};

export default OrdersPage;
