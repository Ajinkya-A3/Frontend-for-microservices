import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
    Grid,
    Box,
    Collapse,
} from "@mui/material";
import OrderItemCard from "./OrderItemCard";

const OrderCard = ({ order, onProductClick, onImageError }) => {
    const {
        shippingAddress,
        paymentStatus,
        shippingStatus,
        totalAmount,
        items,
        createdAt,
        _id,
    } = order;

    const [showAddress, setShowAddress] = useState(false);

    const handleToggleAddress = () => {
        setShowAddress((prev) => !prev);
    };

    return (
        <Card
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
                title={`Order ID: ${_id}`}
                subheader={`Date: ${new Date(createdAt).toLocaleString()}`}
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
                    {items.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item._id} sx={{ display: "flex" }}>
                            <OrderItemCard
                                item={item}
                                onClick={onProductClick}
                                onImageError={onImageError}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />

                <Typography variant="h6" fontWeight="bold" sx={{ color: "#1976D2", mb: 2 }}>
                    Total: ${totalAmount}
                </Typography>

                {shippingAddress && (
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="subtitle1"
                            onClick={handleToggleAddress}
                            sx={{
                                color: "#1976D2",
                                fontWeight: 600,
                                cursor: "pointer",
                                userSelect: "none",
                                textDecoration: "underline",
                            }}
                        >
                            Shipping Details
                        </Typography>
                        <Collapse in={showAddress}>
                            <Typography variant="body2" sx={{ color: "#1976D2" }}>
                                {shippingAddress.fullName}, {shippingAddress.phone}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#1976D2" }}>
                                {shippingAddress.addressLine1}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.postalCode}, {shippingAddress.country}
                            </Typography>
                        </Collapse>
                    </Box>
                )}

                <Typography variant="body2" sx={{ color: "#1976D2", mb: 0.5 }}>
                    <strong>Payment Status:</strong> {paymentStatus}
                </Typography>
                <Typography variant="body2" sx={{ color: "#1976D2" }}>
                    <strong>Shipping Status:</strong> {shippingStatus}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default OrderCard;
