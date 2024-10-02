import { Card, Stack, Typography } from '@mui/material';
import RegFormVolunteer from '../components/RegFormVolunteer.jsx';
import * as React from 'react';

export default function RegistrationPage() {
    // const handleSubmit = async (e) => { 
    //     e.preventDefault(); 
        
    // }
    return <>
        <Stack
            sx={{
                justifyContent: 'center',
                height: '100vh',
                p: 2,
            }}
        >
            <Card variant="outlined" sx={{ p: 4 }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)',  pb: 4 }}
                >
                    Sign up
                </Typography>
                <RegFormVolunteer handleSubmit={handleSubmit} />
            </Card>
        </Stack>
    </>;
}
