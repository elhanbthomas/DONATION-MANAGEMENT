import React, { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Typography,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const imageUrls = [
  '/src/assets/hp1.jpg',
  '/src/assets/hp2.jpg',
  '/src/assets/hp3.jpg',
];

const HomePage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        setFade(true); // Start fade in after image change
      }, 500); // Time for fade-out before changing image
    }, 5000); // Change image every 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Navigation handlers
  const handleAboutClick = () => {
    navigate('/details');
  };

  const handleHomeClick = () => {
    navigate('/');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      {/* Background container with opacity transition */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imageUrls[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'opacity 1s ease-in-out',
          opacity: fade ? 1 : 0,
          zIndex: -1
        }}
      />

      {/* Dimming overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 0
        }}
      />
      {/* App name and logo button */}
      <Button
        onClick={handleHomeClick}
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // This aligns the content vertically and horizontally
          color: 'primary.main',
          textTransform: 'none',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0)'
          }
        }}
      >
        <img src={"/src/assets/logo.png"} alt="App Logo" style={{ height: '32px', marginRight: '8px', verticalAlign: 'middle' }} />
        <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', textAlign: 'center', display: 'inline-block' }}>
          HelpHub
        </Typography>
      </Button>

      {/* Auth buttons container */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          zIndex: 1 // Ensure it's above the dimmed overlay
        }}
      >
        <Button variant="outlined" onClick={handleLoginClick} sx={{ borderRadius: 2, px: 3 }}>
          Login
        </Button>
        <Button variant="contained" onClick={handleSignUpClick} sx={{ borderRadius: 2, px: 3, boxShadow: 2 }}>
          Sign Up
        </Button>
      </Stack>

      {/* Main content centered */}
      <Container maxWidth="md" sx={{ zIndex: 1 }}>
        <Stack
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            textAlign: 'center'
          }}
        >
          <Typography variant="h1" gutterBottom sx={{

            fontSize: { xs: '2.5rem', md: '3.75rem' },
            fontWeight: 700,
            mb: 3,
            color: 'primary.main'
          }}>
            Make a Difference Today
          </Typography>

          <Typography variant="h5" sx={{
            mb: 4,
            color: 'text.secondary',
            maxWidth: '800px',
            lineHeight: 1.8,
            fontSize: { xs: '1.1rem', md: '1.3rem' }
          }}>
            We are dedicated to creating positive change by connecting generous
            hearts with those in need. Our donation management system ensures
            your contribution reaches those who need it most, making every
            donation count in transforming lives affected by unfortunate circumstances.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              size="large"
              onClick={handleAboutClick}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s'
                }
              }}
            >
              About Us
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default HomePage;