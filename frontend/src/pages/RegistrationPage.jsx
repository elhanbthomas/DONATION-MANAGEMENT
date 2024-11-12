import { Card, IconButton, Stack, Typography } from '@mui/material';
import RegFormVolunteer from '../components/RegFormVolunteer.jsx';
import * as React from 'react';
import RegFormDonor from '../components/RegFormDonor.jsx';
import UserPassForm from '../components/UserPassForm.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [userType, setUserType] = React.useState("donor");
    const [page1, setPage1] = React.useState(true);
    const [userData, setUserData] = React.useState({});
    const handlePage1 = (d) => {
        setUserData({ username: d.username, password: d.password });
        setUserType(d.userType);
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
        {page1 && <UserPassForm pageType="register" handleSubmit={handlePage1} goBack={() => { navigate("/") }} />}
        {!page1 && <Stack
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
            }}
        >
            <Card variant="outlined" sx={{ p: 4, width: '60%', minWidth: '500px' }}>
                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pb: 4, gap: 2 }}>
                    <IconButton onClick={() => { setPage1(true) }}>
                        <ArrowBack size="small" />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Enter Details
                    </Typography>
                </Stack>
                {userType === "volunteer" ?

                    <RegFormVolunteer handleSubmit={handleSubmit} />
                    : <RegFormDonor handleSubmit={handleSubmit} />}
            </Card>
        </Stack>}
    </>;
}
