import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage.jsx';
import HomePage from './pages/HomePage.jsx';
import UserPassForm from './components/UserPassForm.jsx';
import LoginPage from './pages/LoginPage.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/reg/donor',
        element: <RegistrationPage userType="donor" />
    },
    {
        path: '/reg/volunteer',
        element: <RegistrationPage userType="volunteer" />
    },
    {
        path: '/login',
        element: <LoginPage />
    }

]);
export default router;
