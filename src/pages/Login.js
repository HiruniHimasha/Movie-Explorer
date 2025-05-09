import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Paper,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      localStorage.setItem('isAuthenticated', 'true');
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      navigate('/home');
    } else {
      setError('Invalid credentials.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));
    setError('');
    alert('Registration successful! You can now log in.');
    setIsRegistering(false);
    setUsername('');
    setPassword('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0d1b2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          backgroundColor: '#0d1b2a',
          border: '3px solid #fbe106',
          borderRadius: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 0 15px rgba(251, 225, 6, 0.4)',
          },
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: '#fbe106',
            fontWeight: 'bold',
            transition: 'color 0.3s',
          }}
        >
          {isRegistering ? 'Register' : 'Login'}
        </Typography>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: '#fbe106' }} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                input: { color: '#fff' },
                transition: 'box-shadow 0.3s',
                '&:focus-within': {
                  boxShadow: '0 0 8px rgba(251, 225, 6, 0.6)',
                },
              },
            }}
            InputLabelProps={{
              sx: { color: '#fbe106' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#fbe106' }} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                input: { color: '#fff' },
                transition: 'box-shadow 0.3s',
                '&:focus-within': {
                  boxShadow: '0 0 8px rgba(251, 225, 6, 0.6)',
                },
              },
            }}
            InputLabelProps={{
              sx: { color: '#fbe106' },
            }}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          {/* Remember Me Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{
                  color: '#fbe106',
                  '&.Mui-checked': {
                    color: '#fbe106',
                  },
                }}
              />
            }
            label="Remember Me"
            sx={{ color: '#fff', textAlign: 'left', mt: 1 }}
          />

          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#fbe106',
                color: '#0d1b2a',
                fontWeight: 'bold',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                  backgroundColor: '#ffe733',
                  transform: 'scale(1.03)',
                },
              }}
            >
              {isRegistering ? 'Register' : 'Login'}
            </Button>
          </Box>
        </form>

        {/* Forgot Password Link */}
        {!isRegistering && (
          <Box sx={{ mt: 2 }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => alert('Password recovery feature coming soon!')}
              sx={{
                color: '#fbe106',
                fontWeight: 'bold',
                textDecoration: 'underline',
                transition: 'color 0.3s',
                '&:hover': {
                  color: '#ffe733',
                },
              }}
            >
              Forgot Password?
            </Link>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            {isRegistering
              ? 'Already have an account?'
              : "Don't have an account?"}{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              sx={{
                color: '#fbe106',
                fontWeight: 'bold',
                textDecoration: 'underline',
                transition: 'color 0.3s',
                '&:hover': {
                  color: '#ffe733',
                },
              }}
            >
              {isRegistering ? 'Login' : 'Register'}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
