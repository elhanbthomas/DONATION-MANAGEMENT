import './App.css'
import RegistrationPage from './pages/RegistrationPage.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage.jsx';
import router from './routes.jsx';
import { Router, RouterProvider } from 'react-router';

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#15B392',
            },
        },
    });


    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    )
}

export default App
