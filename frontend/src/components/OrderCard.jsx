import React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
    Grid,
} from "@mui/material";
import OrderItemCard from "./OrderItemCard";

const OrderCard = ({ order, onProductClick, onImageError }) => {
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
                    {order.items.map((item) => (
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
                <Typography variant="h6" fontWeight="bold" sx={{ color: "#1976D2" }}>
                    Total: ${order.totalAmount}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default OrderCard;
