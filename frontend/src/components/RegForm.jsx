import * as React from 'react';
import { Box, Divider, FormControl, FormLabel, InputLabel, MenuItem, NativeSelect, Select, TextField } from '@mui/material';

export default function RegFormVolunteer({ handleSubmit }) {
    const [age, setAge] = React.useState('');
    const [designation, setDesignation] = React.useState('');

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    }
    const handleDesignationChange = (event) => {
        setDesignation(event.target.value);
    }
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
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
                />
            </FormControl>
            <Divider />
            <FormControl fullWidth>
                <FormLabel >Qualification</FormLabel>
                <Select
                    id="demo-simple-select"
                    value={age}
                    onChange={handleAgeChange}
                >
                    <MenuItem value={"10"}>10th</MenuItem>
                    <MenuItem value={"12"}>12th</MenuItem>
                    <MenuItem value={"clg"}>College</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <FormLabel >Designation</FormLabel>
                <Select
                    value={designation}
                    onChange={handleDesignationChange}
                >
                    <MenuItem value={"d1"}>D1</MenuItem>
                    <MenuItem value={"d2"}>D2</MenuItem>
                    <MenuItem value={"d3"}>D3</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
