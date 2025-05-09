import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, TextField, Button } from '@mui/material';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  // Load user data from localStorage when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setProfile({
        username: storedUser.username || '',
        email: storedUser.email || '',
        phone: storedUser.phone || '',
        password: storedUser.password || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = {
      username: profile.username,
      password: profile.password,
      phone: profile.phone,
      email: profile.email,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile & login credentials saved successfully!');
  };

  return (
    <Box sx={{ mt: 10, px: 2, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ width: '100%', maxWidth: 400, p: 3, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: '#003366', fontSize: 32 }}>
            {profile.username ? profile.username.charAt(0).toUpperCase() : '?'}
          </Avatar>
          <Typography variant="h5" sx={{ mt: 1 }}>
            {profile.username || 'Username'}
          </Typography>
        </Box>
        <TextField
          label="Username"
          name="username"
          value={profile.username}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          value={profile.email}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="phone number"
          value={profile.phone}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={profile.password}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: '#003366' }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
