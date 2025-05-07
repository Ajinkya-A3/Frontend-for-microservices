import React from "react";
import { Card, Typography, Box } from "@mui/material";

const OrderItemCard = ({ item, onClick, onImageError }) => {
    const product = typeof item.productId === "object" ? item.productId : {};
    const productName = product?.productName || item?.productName || "Unnamed Product";
    const productImage = product?.productImage || item?.productImage || "https://placehold.co/80x80?text=No+Image";
    const productId = typeof item.productId === "object" ? item.productId._id : item.productId || null;

    return (
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
                    transform: productId ? "scale(1.015)" : "none",
                },
            }}
            onClick={() => onClick(productId)}
        >
            <img
                src={productImage}
                alt={productName}
                onError={onImageError}
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
                <Typography variant="subtitle1" fontWeight={600} sx={{ color: "#212121" }}>
                    {productName}
                </Typography>
                <Typography variant="body2" color="#212121">
                    Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2" color="#212121">
                    Price:  ${item.price * item.quantity}
                </Typography>
            </Box>
        </Card>
    );
};

export default OrderItemCard;
