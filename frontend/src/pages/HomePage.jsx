import { Button, Card, FormControl, MenuItem, Select, Stack } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [type, setType] = useState("donor");
    return (
        <>
            <Stack
                sx={{
                    justifyContent: 'center',
                    height: '100dvh',
                    alignItems: 'center',
                    p: 2,
                }}
            >
                <Card variant="outlined" sx={{ width: '60%', maxWidth: '500px' }}>
                    <FormControl fullWidth sx={{ p: 2 }}>
                        You are:
                        <Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="donor">Donor</MenuItem>
                            <MenuItem value="volunteer">Volunteer</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ p: 2 }}>
                        <Link to={`/login`} >
                            <Button fullWidth variant="outlined">Log In</Button>
                        </Link>
                    </FormControl>
                    <FormControl fullWidth sx={{ p: 2 }}>
                        <Link to={`/reg/${type}`} >
                            <Button fullWidth variant="outlined" >Sign Up</Button>
                        </Link>
                    </FormControl>
                </Card>
            </Stack >
        </>
    );
}
