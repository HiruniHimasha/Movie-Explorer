import { Box, Typography, Divider } from '@mui/material';

const Footer = ({ mode }) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: mode === 'dark' ? '#0D1B2A' : '#003366',  
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        color: '#fff',
        mt: 3,
        py: 6,
        px: { xs: 2, sm: 4, md: 8 },
        textAlign: 'center',
        position: 'relative',
        transition: 'background 0.3s ease-in-out',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
        '&:hover::after': {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',  
        },
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>
        MovieExplorer
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>
        Your ultimate destination for movie lovers. Explore reviews, ratings, and more.
      </Typography>

      <Box sx={{ my: 3, position: 'relative', zIndex: 1 }}>
        <Typography variant="body2" gutterBottom sx={{ zIndex: 1 }}>
          <strong>Email:</strong> contact@moviemania.com
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ zIndex: 1 }}>
          <strong>Address:</strong> 123 Movie Street, Cinema City, USA
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ zIndex: 1 }}>
          <strong>Phone:</strong> +1 (555) 123-4567
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#424242', my: 2, position: 'relative', zIndex: 1 }} />

      <Typography variant="body2" color="text.secondary" sx={{ position: 'relative', zIndex: 1 }}>
        &copy; {new Date().getFullYear()} MovieExplorer. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
