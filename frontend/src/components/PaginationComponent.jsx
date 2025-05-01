// src/components/PaginationComponent.jsx
import React from 'react';
import { Pagination, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPagination = styled(Pagination)(({ theme }) => ({
    '& .MuiPaginationItem-root': {
        borderRadius: '12px',
        fontWeight: 600,
        color: theme.palette.text.primary,
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: '#fff',
            boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
            transform: 'scale(1.05)',
        },
        '&.Mui-selected': {
            background: 'linear-gradient(135deg, #3f51b5, #2196f3)',
            color: '#fff',
            boxShadow: `0 6px 20px rgba(33, 150, 243, 0.4)`,
        },
    },
}));

const PaginationComponent = ({ count, page, onPageChange }) => {
    return (
        <Box display="flex" justifyContent="center" mt={6} mb={4}>
            <StyledPagination
                count={count}
                page={page}
                onChange={onPageChange}
                size="large"
            />
        </Box>
    );
};

export default PaginationComponent;
