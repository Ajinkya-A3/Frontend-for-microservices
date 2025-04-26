// src/components/ImageViewModal.jsx

import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ImageViewModal = ({ open, imageUrl, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '90%', // Takes up 90% of screen width
                    maxWidth: '500px', // Maximum width for larger screens
                    height: '80vh', // Set height to 80% of the screen height
                    backgroundColor: 'white',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 24,
                    textAlign: 'center',
                    overflow: 'hidden', // Prevent overflow
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={imageUrl}
                    alt="Product Image"
                    style={{
                        width: '100%',         // Image should take full width of the container
                        height: '100%',        // Image should take full height of the container
                        objectFit: 'contain',  // Preserve aspect ratio without cropping
                        maxWidth: '100%',      // Prevent stretching beyond container width
                        maxHeight: '100%',     // Prevent stretching beyond container height
                    }}
                />
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </Modal>
    );
};

export default ImageViewModal;
