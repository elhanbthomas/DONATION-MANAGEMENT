import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import BeneficiaryRequestCard from '../components/BeneficiaryRequestCard';

export default function BeneficiaryRequestList() {
    const [requests, setRequests] = useState([]);

    const initData = async () => {
        try {
            const requestRes = await axios.get('http://localhost:8000/api/beneficiary/request/list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setRequests(requestRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        initData()
    }, [])

    const handleAccept = async (req) => {
        try {
            await axios.post('http://localhost:8000/api/beneficiary/accept', { request_id: req.id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            initData()
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <Box sx={{ width: '100%', maxWidth: 620, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Beneficiary Requests
            </Typography>

            {/* Display filtered requests */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <BeneficiaryRequestCard key={request.id} request={request} onClick={handleAccept} />
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                        No requests found.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
