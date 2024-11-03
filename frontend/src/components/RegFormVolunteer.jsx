import * as React from 'react';
import axios from 'axios';
import { Box, Button, Divider, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import PhoneNumberInput from './PhoneNumberInput';
import { AccountBox } from '@mui/icons-material';

export default function RegFormVolunteer({ handleSubmit }) {

    const [centers, setCenters] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:8000/api/center/list');
            setCenters(res.data);
        }
        fetchData();
    }, []);

    const [data, setData] = React.useState({
        name: '',
        email: '',
        city: '',
        address: '',
        phone: [],
        qualification: '',
        designation: '',
        Center_id: '',
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
                <FormLabel htmlFor="address">Address</FormLabel>
                <TextField
                    name="address"
                    required
                    fullWidth
                    id="address"
                    value={data.address}
                    multiline
                    rows={4}
                    placeholder='9/11'
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                />
            </FormControl>
            <PhoneNumberInput addNumFn={(newNum) => setData({ ...data, phone: data.phone.concat(newNum) })} removeNumFn={(num) => setData({ ...data, phone: data.phone.filter((n) => n !== num) })} nums={data.phone} />
            <Divider />
            <FormControl fullWidth>
                <FormLabel >Center</FormLabel>
                <Select
                    value={centers.filter((c) => c.CenterID === data.Center_id)[0]?.name}
                    onChange={(e) => setData({ ...data, Center_id: e.target.value })}
                >
                    {
                        centers.map((center) => {
                            return <MenuItem value={center.CenterID}>{center.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
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
                <Button variant="outlined" type="submit" startIcon={<AccountBox size="small" />} >Submit</Button>
            </FormControl>
        </Box>
    )
}
