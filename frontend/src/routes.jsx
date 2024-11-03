import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PickupTable from './components/PickupTable.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NewItemPickup from './pages/NewItemPickup.jsx';
import CenterRequestForm from './pages/CenterRequestForm.jsx';
import LocationViewer from './pages/LocationViewer.jsx';
import Details from './pages/Details.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/register',
        element: <RegistrationPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/details',
        element: <Details />
    },
    {
        path: '/dashboard',
        element: <Dashboard userType={"volunteer"} />
    },
    {
        path: '/new/donation',
        element: <NewItemPickup />
    },
    {
        path: '/new/center-request',
        element: <CenterRequestForm />
    },
    {
        path: '/location',
        element: <LocationViewer />
    }

]);
export default router;
