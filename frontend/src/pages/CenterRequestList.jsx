import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CenterRequestCard from '../components/CenterRequestCard';
import axios from 'axios';

export default function CenterRequestList() {
    const [myRequests, setMyRequests] = useState([]);
    const [otherRequests, setOtherRequests] = useState([]);
    const [filter, setFilter] = useState('myRequests');

    const initData = async () => {
        try {
            const requestRes = await axios.get('http://localhost:8000/api/center/myrequests', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setMyRequests(requestRes.data);
        } catch (err) {
            console.error(err);
        }
        try {
            const requestRes = await axios.get('http://localhost:8000/api/center/list/requests', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setOtherRequests(requestRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        initData()
    }, [])

    const handleAccept = async (req) => {
        try {
            await axios.post('http://localhost:8000/api/center/accept', { req_id: req.req_id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            initData()
        } catch (err) {
            console.error(err);
        }
    };
    const handleReceive = async (req) => {
        try {
            await axios.post('http://localhost:8000/api/center/received', { req_id: req.req_id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            initData()
        } catch (err) {
            console.error(err);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Filter requests based on dropdown selection
    const filteredRequests = filter === 'myRequests' ? myRequests : otherRequests;

    return (
        <Box sx={{ width: '100%', maxWidth: 620, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Center Requests
            </Typography>

            {/* Dropdown for filtering */}
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="filter-label">Filter by Center</InputLabel>
                <Select
                    labelId="filter-label"
                    value={filter}
                    label="Filter by Center"
                    onChange={handleFilterChange}
                >
                    <MenuItem value="myRequests">Current Center</MenuItem>
                    <MenuItem value="otherRequests">Other Centers</MenuItem>
                </Select>
            </FormControl>

            {/* Display filtered requests */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                        <CenterRequestCard key={request.id} request={request} onClick={filter === 'myRequests' ? handleReceive : handleAccept} current={filter === 'myRequests'} />
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
