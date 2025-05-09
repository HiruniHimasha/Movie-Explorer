import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { fetchTrendingMovies } from '../api/tmdb';
import MovieGrid from './MovieGrid';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then((res) => setMovies(res.data.results));
  }, []);

  return (
    <>
      <Typography variant="h5" m={2}>Trending Movies</Typography>
      <MovieGrid movies={movies} />
    </>
  );
};

export default TrendingMovies;
