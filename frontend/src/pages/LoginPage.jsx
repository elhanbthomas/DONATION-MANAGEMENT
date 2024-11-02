import * as React from 'react'
import UserPassForm from '../components/UserPassForm.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = React.useState('')
    const handleSubmit = async (data) => {
        try {
            const res = await axios.post(`http://localhost:8000/api/token/`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            localStorage.setItem("accessToken", res.data.access)
            localStorage.setItem("refreshToken", res.data.refresh)
            navigate("/dashboard")
        } catch (err) {
        setError("Invalid Credentials")
        }
    }
    return (
        <UserPassForm pageType="login" handleSubmit={handleSubmit} error={error}/>
    )
}
