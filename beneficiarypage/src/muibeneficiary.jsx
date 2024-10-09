import React, { useState, useEffect } from 'react';
import { TextField, Button, Tooltip, Card, Stack, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

// List of Indian states
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    address: '',
    pincode: '',
    phone: '',
    email: '',
    latitude: '',
    longitude: '',
  });

  const [geolocationAllowed, setGeolocationAllowed] = useState(false);

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      setGeolocationAllowed(result.state === 'granted');
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!geolocationAllowed) {
        console.log('Geolocation permission not granted.');
        return;
      }

      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      const updatedFormData = {
        ...formData,
        latitude: latitude.toFixed(6),
        longitude: longitude.toFixed(6),
      };

      setFormData(updatedFormData);
      console.log(updatedFormData);
    } catch (error) {
      console.error('Geolocation error:', error.message);
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Card variant="outlined" sx={{ width: '50%', maxWidth: '1000px', padding: 3 }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>CONTACT FORM</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel id="state-select-label">State</InputLabel>
                <Select
                  labelId="state-select-label"
                  id="state-select"
                  value={formData.state}
                  label="State"
                  name="state"
                  onChange={handleChange}
                  sx={{
                    '& .MuiSelect-select': {
                      textAlign: 'left',
                      paddingLeft: '14px',
                    },
                  }}
                >
                  {indianStates.map((state) => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Tooltip title={geolocationAllowed ? '' : 'Allow geolocation to continue'}>
                <span>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!geolocationAllowed}
                    fullWidth
                  >
                    Submit
                  </Button>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Stack>
  );
};

export default UserForm;