import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, MenuItem, Box, InputAdornment, Paper } from '@mui/material';

const SearchSortComponent = ({ searchQuery, setSearchQuery, sortOrder, setSortOrder }) => {
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        mb: 4,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Search Input */}
      <Paper
        elevation={4}
        sx={{
          px: 2,
          py: 1,
          borderRadius: '12px',
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          width: { xs: '90%', sm: '400px' },
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#3f51b5' }} />
              </InputAdornment>
            ),
            sx: {
              pl: 1,
              fontSize: '1rem',
              color: 'text.primary',
            },
          }}
        />
      </Paper>

      {/* Sort Dropdown */}
      <Paper
        elevation={4}
        sx={{
          px: 2,
          py: 1,
          borderRadius: '12px',
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          width: { xs: '90%', sm: '200px' },
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          select
          label="Sort by Price"
          value={sortOrder}
          onChange={handleSortChange}
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: '1rem',
              color: 'text.primary',
            },
          }}
          InputLabelProps={{
            sx: {
              fontWeight: 'bold',
              color: '#3f51b5',
            },
          }}
        >
          <MenuItem value="asc">Low to High</MenuItem>
          <MenuItem value="desc">High to Low</MenuItem>
        </TextField>
      </Paper>
    </Box>
  );
};

export default SearchSortComponent;
