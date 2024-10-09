import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


import UserForm from './muibeneficiary';

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
          <CssBaseline/>
          <UserForm></UserForm>
      </ThemeProvider>
    </>
  )
}

export default App
