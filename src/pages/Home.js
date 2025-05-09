import React from 'react';
import { Container } from '@mui/material';
import MovieGrid from '../components/MovieGrid';
import TrendingMovies from '../components/TrendingMovies';

const Home = ({ movies, loadMore }) => {
  return (
    <Container sx={{ mt: { xs: 10, sm: 12 } }}>
      {movies.length > 0 ? (
        <>
          <MovieGrid movies={movies} />
          <Container sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
            <button onClick={loadMore}>Load More</button>
          </Container>
        </>
      ) : (
        <TrendingMovies />
      )}
    </Container>
  );
};

export default Home;
