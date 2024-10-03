import * as React from 'react';
import { Box, Button, Divider, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import PhoneNumberInput from './PhoneNumberInput';
import { Save } from '@mui/icons-material';

export default function RegFormDonor({ handleSubmit }) {
    const [data, setData] = React.useState({
        name: '',
        email: '',
        city: '',
        house: '',
        phone: [],
    })

    return (
        <Box
            component="form"
            onSubmit={() => handleSubmit(data)}
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
                <FormLabel htmlFor="name">Email</FormLabel>
                <TextField
                    autoComplete="email"
                    name="email"
                    required
                    fullWidth
                    id="name"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder="joe.mama@mail.com"
                />
            </FormControl>
            <Divider />
            <FormControl>
                <FormLabel htmlFor="name">City</FormLabel>
                <TextField
                    name="city"
                    required
                    fullWidth
                    id="city"
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    placeholder="Kottayam"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="house">House No.</FormLabel>
                <TextField
                    name="house"
                    required
                    fullWidth
                    id="house"
                    placeholder="9/11"
                    value={data.house}
                    onChange={(e) => setData({ ...data, house: e.target.value })}
                />
            </FormControl>
            <PhoneNumberInput addNumFn={(newNum) => setData({ ...data, phone: data.phone.concat(newNum) })} removeNumFn={(num) => setData({ ...data, phone: data.phone.filter((n) => n !== num) })} nums={data.phone} />
            <FormControl fullWidth sx={{ mt: 2 }}>
                <Button variant="outlined" type="submit" startIcon={<Save size="small"/>} >Submit</Button>
            </FormControl>
        </Box>
    )
}
