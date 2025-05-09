import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api/tmdb';
import { Container, Typography, Chip, Box, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MovieContext } from '../context/MovieContext';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const { favorites, setFavorites } = useContext(MovieContext);

  useEffect(() => {
    fetchMovieDetails(id).then((res) => setMovie(res.data));
  }, [id]);

  if (!movie) {
    return (
      <Container sx={{ mt: 2 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <Container sx={{ mt: { xs: 10, sm: 12 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">{movie.title}</Typography>

        <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
          <IconButton
            onClick={toggleFavorite}
            sx={{
              color: isFavorite ? 'error.main' : 'text.secondary',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 2 }}>
        {movie.genres?.map((genre) => (
          <Chip key={genre.id} label={genre.name} />
        ))}
      </Box>

      <Typography variant="body1" gutterBottom>
        {movie.overview}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Trailer:</Typography>
        {movie.videos?.results?.length > 0 ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
            title={movie.title}
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <Typography>No trailer available</Typography>
        )}
      </Box>
    </Container>
  );
};

export default MoviePage;
