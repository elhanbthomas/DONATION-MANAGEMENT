import './App.css'
import RegistrationPage from './pages/RegistrationPage.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

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
                <RegistrationPage />
            </ThemeProvider>
        </>
    )
}

export default App
