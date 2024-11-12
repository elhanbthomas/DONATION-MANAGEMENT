import * as React from 'react';
import PropTypes from 'prop-types';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Healing } from '@mui/icons-material';
import BeneficiaryRequest from './BeneficiaryRequest';
import axios from 'axios';
import VolunteerPickupList from '../components/VolunteerPickupList';

const volunteerNavigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'new-beneficiary-request',
        title: 'New Beneficiary Request',
        icon: <Healing />,
    }
]


function VolunteerDashboard({ session, authentication, router, appTheme, branding }) {

    const [items, setItems] = React.useState([])
    const setPickedUp = async (item, received) => {
        let token = localStorage.getItem('accessToken')
        try {
            await axios.post("http://127.0.0.1:8000/api/pickup/update", { id: item.id, isPicked: true, isReceived: received }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            getVolunteerPickups()
        } catch (err) {
            alert('Something went wrong')
            console.error(err)
        }
    }

    const getVolunteerPickups = async () => {
        let token = localStorage.getItem('accessToken')
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/volunteer/mypickups", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setItems(res.data)
            console.log(res.data);
        } catch (err) {
            alert('Something went wrong')
            console.error(err)
        }
    }

    React.useEffect(() => {
        getVolunteerPickups()
    }, [])

    const renderDashboard = (pathname) => {
        if (pathname === '/new-beneficiary-request') return <BeneficiaryRequest goBack={() => router.navigate('/dashboard')} />
        else return <VolunteerPickupList afterConfirmPickedFn={(item) => setPickedUp(item, false)} afterConfirmReceivedFn={(item) => setPickedUp(item, true)} buttonText={"Picked Up"} items={items} />
    }

    return (
        // preview-start
        <AppProvider
            navigation={volunteerNavigation}
            session={session}
            authentication={authentication}
            router={router}
            theme={appTheme}
            branding={branding}
        >
            <DashboardLayout
                defaultSidebarCollapsed
            >
                {
                    renderDashboard(router.pathname)
                }
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}

VolunteerDashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default VolunteerDashboard;

