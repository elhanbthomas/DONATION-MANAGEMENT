import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Donation Management Project
          </Typography>
          <Button color="inherit" component={Link} to="/login">
            Log In
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            textAlign: 'center',
          }}
        >
          <div style={{ width: '200px', height: '200px', overflow: 'hidden', borderRadius: '50%', marginBottom: '10px' }}>
            <img src="/src/assets/logo.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <Typography variant="h2" gutterBottom>
            Donation Management Project
          </Typography>
          <Typography variant="h5" color="textSecondary" >
            Help out as much as you can.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link} to="/login"
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;