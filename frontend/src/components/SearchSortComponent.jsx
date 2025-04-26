// src/components/SearchSortComponent.jsx
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, MenuItem, Box } from '@mui/material';

const SearchSortComponent = ({ searchQuery, setSearchQuery, sortOrder, setSortOrder }) => {

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Search Field */}
            <TextField
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                size="medium"
                variant="outlined"
                sx={{
                    width: { xs: '100%', sm: '400px' },
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: 2,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,  // Ensures consistent rounded corners
                        '& fieldset': {
                            borderColor: '#ddd',  // Set border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#3f51b5',  // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#3f51b5',  // Focused border color
                        },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <SearchIcon sx={{ color: 'gray', mr: 1 }} />
                    ),
                    style: {
                        paddingLeft: '12px', // Ensures text starts with padding
                    },
                }}
            />

            {/* Sort By Price Field */}
            <TextField
                label="Sort by Price"
                select
                value={sortOrder}
                onChange={handleSortChange}
                size="medium"
                variant="outlined"
                sx={{
                    width: { xs: '100%', sm: '200px' },
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: 2,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                            borderColor: '#ddd',
                        },
                        '&:hover fieldset': {
                            borderColor: '#3f51b5',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#3f51b5',
                        },
                    },
                }}
            >
                <MenuItem value="asc">Low to High</MenuItem>
                <MenuItem value="desc">High to Low</MenuItem>
            </TextField>
        </Box>
    );
};

export default SearchSortComponent;
