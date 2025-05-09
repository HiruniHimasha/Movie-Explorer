import axios from 'axios';

const API_KEY = '9355d02f0dbb7feb3610048d92be9b06';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrendingMovies = () => tmdb.get('/trending/movie/week');
export const searchMovies = (query, page = 1) => tmdb.get('/search/movie', { params: { query, page } });
export const fetchMovieDetails = (movieId) => tmdb.get(`/movie/${movieId}`, { params: { append_to_response: 'videos,credits' } });
