import * as React from 'react';
import { Box, Button, Divider, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import PhoneNumberInput from './PhoneNumberInput';
import { AccountBox } from '@mui/icons-material';

export default function RegFormDonor({ handleSubmit }) {

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setData((d) => {
                    return {
                        ...d,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                });
                console.log(position)
            },
            (error) => {
                let errorMessage = 'An unknown error occurred';
                switch (error.code) {
                    case 1:
                        errorMessage = 'Permission denied. Please allow location access.';
                        break;
                    case 2:
                        errorMessage = 'Position unavailable. Please try again.';
                        break;
                    case 3:
                        errorMessage = 'Location request timed out. Please try again.';
                        break;
                }
                alert(errorMessage)
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );

    }, [])

    const [data, setData] = React.useState({
        name: '',
        email: '',
        city: '',
        district: '',
        address: '',
        pincode: '',
        latitude: null,
        longitude: null,
        phone: [],
    })

    return (
        <Box
            component="form"
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(data)
            }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <FormControl>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="Joe Mama"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                    autoComplete="email"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder="joe.mama@mail.com"
                />
            </FormControl>
            <Divider />
            <FormControl>
                <FormLabel htmlFor="district">District</FormLabel>
                <TextField
                    name="district"
                    required
                    fullWidth
                    id="district"
                    value={data.district}
                    onChange={(e) => setData({ ...data, district: e.target.value })}
                    placeholder="Kottayam"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="city">City</FormLabel>
                <TextField
                    name="city"
                    required
                    fullWidth
                    id="city"
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    placeholder="Pala"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="address">Address</FormLabel>
                <TextField
                    name="address"
                    required
                    fullWidth
                    id="address"
                    multiline
                    rows={4}
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="pincode">Pincode</FormLabel>
                <TextField
                    name="pincode"
                    type='number'
                    required
                    fullWidth
                    id="pincode"
                    multiline={true}
                    value={data.pincode}
                    onChange={(e) => setData({ ...data, pincode: e.target.value })}
                />
            </FormControl>
            <PhoneNumberInput addNumFn={(newNum) => setData({ ...data, phone: data.phone.concat(newNum) })} removeNumFn={(num) => setData({ ...data, phone: data.phone.filter((n) => n !== num) })} nums={data.phone} />
            <FormControl fullWidth sx={{ mt: 2 }}>
                <Button variant="outlined" type="submit" startIcon={<AccountBox size="small" />} >Submit</Button>
            </FormControl>
        </Box>
    )
}