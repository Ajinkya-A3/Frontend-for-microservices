// src/components/PaginationComponent.jsx
import React from 'react';
import { Pagination, Box } from '@mui/material';

const PaginationComponent = ({ count, page, onPageChange }) => {
    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
                count={count}
                page={page}
                onChange={onPageChange}
                color="primary"
                size="large"
            />
        </Box>
    );
};

export default PaginationComponent;
