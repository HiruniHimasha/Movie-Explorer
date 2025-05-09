import React, { useContext } from 'react';
import { Container, Typography } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';

const Favorites = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <Container sx={{ mt: { xs: 10, sm: 12 }}}>
      <Typography variant="h5" gutterBottom>Your Favorite Movies</Typography>
      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <Typography>You have no favorite movies yet.</Typography>
      )}
    </Container>
  );
};

export default Favorites;
