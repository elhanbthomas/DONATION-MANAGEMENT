import * as React from 'react';
import { Box, Button, Divider, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import PhoneNumberInput from './PhoneNumberInput';
import { Save } from '@mui/icons-material';

export default function RegFormVolunteer({ handleSubmit }) {
    const [data, setData] = React.useState({
        name: '',
        email: '',
        city: '',
        house_no: '',
        phone: [],
        qualification: '',
        designation: '',
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
                    id="name"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder="joe.mama@mail.com"
                />
            </FormControl>
            <Divider />
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
                <FormLabel htmlFor="house">House No.</FormLabel>
                <TextField
                    name="house"
                    required
                    fullWidth
                    id="house"
                    value={data.house_no}
                    placeholder='9/11'
                    onChange={(e) => setData({ ...data, house_no: e.target.value })}
                />
            </FormControl>
            <PhoneNumberInput addNumFn={(newNum) => setData({ ...data, phone: data.phone.concat(newNum) })} removeNumFn={(num) => setData({ ...data, phone: data.phone.filter((n) => n !== num) })} nums={data.phone} />
            <Divider />
            <FormControl fullWidth>
                <FormLabel >Qualification</FormLabel>
                <Select
                    value={data.qualification}
                    onChange={(e) => setData({ ...data, qualification: e.target.value })}
                >
                    <MenuItem value={"10"}>10th</MenuItem>
                    <MenuItem value={"12"}>12th</MenuItem>
                    <MenuItem value={"clg"}>College</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <FormLabel >Designation</FormLabel>
                <Select
                    value={data.designation}
                    onChange={(e) => setData({ ...data, designation: e.target.value })}
                >
                    <MenuItem value={"d1"}>D1</MenuItem>
                    <MenuItem value={"d2"}>D2</MenuItem>
                    <MenuItem value={"d3"}>D3</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <Button variant="outlined" type="submit" startIcon={<Save size="small" />} >Submit</Button>
            </FormControl>
        </Box>
    )
}
