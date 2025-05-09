import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './styles/theme';
import { MovieProvider } from './context/MovieContext';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { searchMovies } from './api/tmdb';
import Footer from './pages/Footer';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [mode, setMode] = useState('light');
  const theme = getTheme(mode);

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    searchMovies(searchQuery).then((res) => {
      setMovies(res.data.results);
    });
  };

  const loadMore = () => {
    const nextPage = page + 1;
    searchMovies(query, nextPage).then((res) => {
      setMovies((prev) => [...prev, ...res.data.results]);
      setPage(nextPage);
    });
  };

  return (
    <MovieProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <RouterContent
            onSearch={handleSearch}
            mode={mode}
            movies={movies}
            loadMore={loadMore}
            toggleMode={() => setMode(mode === 'light' ? 'dark' : 'light')}
          />
        </Router>
      </ThemeProvider>
    </MovieProvider>
  );
}

const RouterContent = ({ onSearch, mode, movies, loadMore, toggleMode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && (
        <Navbar
          onSearch={onSearch}
          toggleMode={toggleMode}
          mode={mode}
        />
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <Home
              movies={movies}
              loadMore={loadMore}
            />
          }
        />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<ProfilePage />} />
        
      </Routes>

      {!isLoginPage && (
        <Footer
          onSearch={onSearch}
          toggleMode={toggleMode}
          mode={mode}
        />
      )}

    </>
  );
};

export default App;
