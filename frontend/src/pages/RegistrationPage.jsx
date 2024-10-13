import { Card, Stack, Typography } from '@mui/material';
import RegFormVolunteer from '../components/RegFormVolunteer.jsx';
import * as React from 'react';
import RegFormDonor from '../components/RegFormDonor.jsx';
import UserPassForm from '../components/UserPassForm.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage({ userType }) {
    const navigate = useNavigate();
    const [page1, setPage1] = React.useState(true);
    const [userData, setUserData] = React.useState({});
    const handlePage1 = (d) => {
        setUserData({ username: d.username, password: d.password });
        setPage1(false);
    }
    const handleSubmit = async (d) => {
        // api call
        let formData = {
            ...userData,
            profile: {
                ...d, phone: d.phone.map((p) => { return { number: p } })
            }
        }
        try {
            await axios.post(`http://localhost:8000/api/register/${userType}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            navigate("/")
        } catch (err) {
            console.log("Error occured", err);
        }
    }
    return <>
        {page1 && <UserPassForm pageType="register" userType={userType} handleSubmit={handlePage1} />}
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
