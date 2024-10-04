import { Card, Stack, Typography } from '@mui/material';
import RegFormVolunteer from '../components/RegFormVolunteer.jsx';
import * as React from 'react';
import RegFormDonor from '../components/RegFormDonor.jsx';
import UserPassForm from '../components/UserPassForm.jsx';

export default function RegistrationPage({ userType }) {
    const [page1, setPage1] = React.useState(true);
    const [userData, setUserData] = React.useState({});
    const handlePage1 = (d) => {
        setUserData({username: d.username, password: d.password});
        setPage1(false);
    }
    const handleSubmit = (d) => {
        // api call

    }
    return <>
        {page1 && <UserPassForm pageType="register" userType={userType} handleSubmit={handlePage1}/>}
        {!page1 && <Stack
            sx={{
                justifyContent: 'center',
                p: 2,
            }}
        >
            <Card variant="outlined" sx={{ p: 4 }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', pb: 4 }}
                >
                    Sign up
                </Typography>
                {userType === "volunteer" ?
                    <RegFormVolunteer handleSubmit={handleSubmit} />
                    : <RegFormDonor handleSubmit={handleSubmit} />}
            </Card>
        </Stack>}
    </>;
}
