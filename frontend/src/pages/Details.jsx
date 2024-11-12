import React from 'react';
import {
    Container,
    Typography,
    Stack,
    Paper,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const Details = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Stack spacing={4}>
                    <Typography variant="h3" gutterBottom>
                        About Our Donation Management System
                    </Typography>

                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                        Our donation management system is designed to create a seamless bridge between
                        donors and those in need. We believe in transparency, efficiency, and making
                        every contribution count.
                    </Typography>

                    <Stack spacing={2}>
                        <Typography variant="h5" gutterBottom>
                            Our Mission
                        </Typography>
                        <Typography variant="body1">
                            To facilitate and streamline the process of charitable giving, ensuring that
                            help reaches those who need it most in the most efficient way possible.
                        </Typography>
                    </Stack>

                    <Stack spacing={2}>
                        <Typography variant="h5" gutterBottom>
                            How It Works
                        </Typography>
                        <Typography variant="body1">
                            1. Donors can easily register and make contributions <br />
                            2. Beneficiaries are carefully verified <br />
                            3. Transparent tracking of donations <br />
                            4. Regular updates on impact <br />
                        </Typography>
                    </Stack>

                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{ alignSelf: 'center', mt: 2 }}
                        startIcon={<ArrowBack fontSize='small' />}
                    >
                        Back to Home
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Details;