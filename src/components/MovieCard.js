import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{
    maxWidth: 200,
    m: 1.5,
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: 6,
    },
  }}>
      <CardActionArea onClick={() => navigate(`/movie/${movie.id}`)}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="subtitle1">{movie.title}</Typography>
          <Typography variant="body2">{movie.release_date?.split('-')[0]}</Typography>
          <Typography variant="body2">⭐ {movie.vote_average}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
