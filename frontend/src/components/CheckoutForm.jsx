import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

const CheckoutForm = ({ cartItems }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [form, setForm] = useState({
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handlePincodeBlur = async () => {
        if (!/^\d{6}$/.test(form.postalCode)) return;

        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${form.postalCode}`);
            const data = await res.json();
            const info = data[0]?.PostOffice?.[0];

            if (info) {
                setForm((prev) => ({
                    ...prev,
                    city: info.District || '',
                    state: info.State || '',
                    addressLine2: prev.addressLine2 || info.Block || '',
                }));
            } else {
                toast.error('Invalid Pincode');
            }
        } catch {
            toast.error('Failed to fetch address info');
        }
    };

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z ]{2,}$/;
        const phoneRegex = /^[6-9]\d{9}$/;
        const pincodeRegex = /^\d{6}$/;

        if (!nameRegex.test(form.fullName)) return toast.error('Enter a valid name');
        if (!phoneRegex.test(form.phone)) return toast.error('Enter a valid 10-digit phone number');
        if (!form.addressLine1.trim()) return toast.error('Address Line 1 is required');
        if (!form.city.trim()) return toast.error('City is required');
        if (!form.state) return toast.error('State is required');
        if (!pincodeRegex.test(form.postalCode)) return toast.error('Enter a valid 6-digit pincode');

        return true;
    };

    const calculateTotalAmount = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleBuyNow = async () => {
        if (!token) return toast.error('User not authenticated');
        if (!validateForm()) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_ORDER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ shippingAddress: form }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Order placed successfully!');
                navigate('/orders');
            } else {
                toast.error(data.message || 'Failed to place order');
            }
        } catch {
            toast.error('Something went wrong');
        }
    };

    return (
        <Box sx={{ p: 4, borderRadius: 2, backgroundColor: '#ffffff', boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
                Shipping Information
            </Typography>
            <Grid container spacing={3}>
                {[
                    { label: 'Full Name', name: 'fullName', xs: 12, sm: 6 },
                    { label: 'Phone Number', name: 'phone', xs: 12, sm: 6 },
                    { label: 'Address Line 1', name: 'addressLine1', xs: 12, sm: 12 },
                    { label: 'Address Line 2 (Optional)', name: 'addressLine2', xs: 12, sm: 12 },
                    { label: 'City', name: 'city', xs: 12, sm: 6 },
                ].map(({ label, name, xs, sm }) => (
                    <Grid item xs={xs} sm={sm} key={name}>
                        <TextField
                            fullWidth
                            variant="filled"
                            label={label}
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            onBlur={name === 'postalCode' ? handlePincodeBlur : undefined}
                            InputProps={{ disableUnderline: true }}
                            sx={{
                                backgroundColor: '#f7f7f7',
                                borderRadius: 1,
                                '& .MuiFilledInput-root': { borderRadius: 1 },
                                mb: 2, // spacing between fields
                            }}
                        />
                    </Grid>
                ))}

                {/* State Field with Flexbox Layout */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        select
                        variant="filled"
                        label="State"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        InputProps={{ disableUnderline: true }}
                        sx={{
                            backgroundColor: '#f7f7f7',
                            borderRadius: 1,
                            mb: 2,
                            '& .MuiFilledInput-root': {
                                paddingRight: 22, // Adjust padding to avoid clipping the dropdown text
                            },
                            '& .MuiSelect-select': {
                                paddingRight: 12,  // Ensures the dropdown indicator is visible
                            },
                        }}
                    >
                        {INDIAN_STATES.map((state) => (
                            <MenuItem key={state} value={state}>
                                {state}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>



                {/* Pincode Field */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Pincode"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        onBlur={handlePincodeBlur}
                        InputProps={{ disableUnderline: true }}
                        sx={{
                            backgroundColor: '#f7f7f7',
                            borderRadius: 1,
                            mb: 2,
                        }}
                    />
                </Grid>

                {/* Country Field */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Country"
                        name="country"
                        value={form.country}
                        disabled
                        InputProps={{ disableUnderline: true }}
                        sx={{
                            backgroundColor: '#f7f7f7',
                            borderRadius: 1,
                            mb: 2,
                        }}
                    />
                </Grid>

                {/* Proceed to Pay Button */}
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleBuyNow}
                        sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            borderRadius: 2,
                            background: 'linear-gradient(to right, #2196f3, #00bcd4)',
                            color: '#fff',
                            transition: '0.4s ease',
                            '&:hover': {
                                background: 'linear-gradient(to right, #00bcd4, #2196f3)',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Proceed to Pay ${calculateTotalAmount().toFixed(2)}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CheckoutForm;
