import * as React from 'react';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { UserDetailsContext } from '../components/Contexts';
import VolunteerDashboard from './VolunteerDashboard';
import DonorDashboard from './DonorDashboard';
import { Avatar, Box, CircularProgress, createTheme } from '@mui/material';
import StaffDashboard from './StaffDashboard';

const appTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const branding = {
  title: 'HelpHub',
  logo: <Avatar src="/src/assets/logo.png" sx={{ mr: '5px' }} />
}

function Dashboard() {
  const [userDetails, setUserDetails] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails, isLoading, setIsLoading, error, setError }} >
      <DynamicDashboard />
    </UserDetailsContext.Provider>
  )
}
function DynamicDashboard() {
  const navigate = useNavigate();
  const { userDetails, setUserDetails, isLoading, setIsLoading, error, setError } = React.useContext(UserDetailsContext)

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("accessToken")
      try {
        const res = await axios.get('http://localhost:8000/api/details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(res.data)
        setIsLoading(false)
      } catch (err) {
        alert('Something went wrong. ')
        console.error(err)
        navigate('/')
      }
    }
    fetchUserDetails()
  }, [])

  React.useEffect(() => {
    setSession({
      user: {
        name: userDetails.user_details ? userDetails.user_details.name : '',
        email: userDetails.user_details ? userDetails.user_details.email : '',
      }
    })

  }, [userDetails])

  const [session, setSession] = React.useState({
    user: {
      name: '',
      email: '',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => { },
      signOut: async () => {
        try {
          await axios.post("http://localhost:8000/logout", {
            refresh: localStorage.getItem('refreshToken')
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
        } catch (err) {
          console.error(err)
        }

        localStorage.clear('accessToken')
        localStorage.clear('refreshToken')
        navigate('/')
      },
    };
  }, []);

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Show loading state if userDetails hasn't been set yet
  if (!userDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    userDetails.user_type === 'staff' ?
      <StaffDashboard
        session={session}
        authentication={authentication}
        router={router}
        appTheme={appTheme}
        branding={branding}
      />
      : userDetails.user_type === 'volunteer' ?
        <VolunteerDashboard
          session={session}
          authentication={authentication}
          router={router}
          appTheme={appTheme}
          branding={branding}
        /> :
        <DonorDashboard
          session={session}
          authentication={authentication}
          router={router}
          appTheme={appTheme}
          branding={branding}
        />

  );
}

export default Dashboard;

