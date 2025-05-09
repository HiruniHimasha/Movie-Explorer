import React, { useState, useContext } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MovieContext } from '../context/MovieContext';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { setLastSearch } = useContext(MovieContext);

  const handleSearch = (value) => {
    onSearch(value);
    setLastSearch(value);
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery); // auto-search while typing
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query); // search on Enter too (optional)
    }
  };

  return (
    <Box display="flex" justifyContent="center" my={2} sx={{ width: '100%'}}>
      <TextField
        variant="outlined"
        label="Search Movies"
        size='small'
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        sx={{ width: '100%'}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleSearch(query)}
                color="primary"
                sx={{
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
