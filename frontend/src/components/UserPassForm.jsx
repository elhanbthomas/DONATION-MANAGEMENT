import { Login, Save } from '@mui/icons-material';
import { InputLabel, FormControl, Select, MenuItem, TextField, Stack, Card, Typography, Box, Button, Alert } from '@mui/material';
import * as React from 'react';

export default function UserPassForm({ pageType, handleSubmit, error }) {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirmPassword: '',
        userType: 'donor'
    })
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
                <Card variant="outlined" sx={{ width: '60%', maxWidth: '500px', p: 4 }}>
                    <Box
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (pageType === 'register') {
                                if (!data.confirmPassword || data.password !== data.confirmPassword) {
                                    alert('Passwords do not match')
                                    return
                                }
                            }
                            handleSubmit(data)
                        }}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        {error && <Alert severity='error'>{error}</Alert>}
                    {pageType=='register' && 
                    <FormControl fullWidth>
                        You are:
                        <Select
                            value={data.userType}
                            onChange={(e) => setData({...data, userType: e.target.value})}
                        >
                            <MenuItem value="donor">Donor</MenuItem>
                            <MenuItem value="volunteer">Volunteer</MenuItem>
                        </Select>
                    </FormControl> }
                        <FormControl fullWidth>
                            <TextField
                                autoComplete="username"
                                name="username"
                                fullWidth
                                id="username"
                                value={data.username}
                                label="Username"
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                autoComplete="password"
                                name="password"
                                type="password"
                                fullWidth
                                id="password"
                                label="Password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                        </FormControl>
                        {pageType === 'register' && <FormControl fullWidth>
                            <TextField
                                autoComplete="password"
                                name="password2"
                                type="password"
                                fullWidth
                                id="password2"
                                label="Confirm password"
                                value={data.confirmPassword}
                                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                            />
                        </FormControl>}
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <Button variant="outlined" type="submit" startIcon={<Login size="small" />} >{pageType === 'login' ? 'Sign In' : 'Sign Up'}</Button>
                        </FormControl>
                    </Box>
                </Card>
            </Stack >
        </>
    );
}
