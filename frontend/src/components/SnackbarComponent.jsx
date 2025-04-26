// src/components/SnackbarComponent.jsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarComponent = ({ open, onClose, severity, message, autoHideDuration = 1500, anchorOrigin = { vertical: 'top', horizontal: 'center' } }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
        >
            <Alert severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarComponent;
