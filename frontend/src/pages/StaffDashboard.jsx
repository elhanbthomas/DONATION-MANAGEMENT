import * as React from 'react';
import PropTypes from 'prop-types';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Healing, Hub, Inventory, Sos } from '@mui/icons-material';
import BeneficiaryRequest from './BeneficiaryRequest';
import CenterRequestForm from './CenterRequestForm';
import axios from 'axios';
import CenterRequestList from './CenterRequestList';
import InventoryView from './InventoryView';
import StaffPickupList from '../components/StaffPickupList';
import BenificiaryRequestList from './BeneficiaryRequestList';

const staffNavigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'beneficiary-requests',
        title: 'Beneficiary Requests',
        icon: <Healing />,
    },
    { kind: 'divider' },
    {
        segment: 'center-request',
        title: 'Center Requests',
        icon: <Hub />,
    },
    {
        segment: 'new-center-request',
        title: 'New Center Request',
        icon: <Sos />,
    },
    {
        segment: 'inventory',
        title: 'Inventory',
        icon: <Inventory />,
    },

]


function StaffDashboard({ session, authentication, router, appTheme, branding }) {

    const [items, setItems] = React.useState([])
    const [volunteers, setVolunteers] = React.useState([])
    const setReceived = async (item) => {
        let token = localStorage.getItem('accessToken')
        try {
            await axios.post("http://localhost:8000/api/center/donor/receive", { request_id: item.id, isAccepted: true }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            getStaffPickups()
        } catch (err) {
            alert('Something went wrong')
            console.error(err)
        }
    }
    const assignVolunteer = async (item, volunteer) => {
        let token = localStorage.getItem('accessToken')
        try {
            await axios.post("http://127.0.0.1:8000/api/volunteer/assign", { vol_id: volunteer, pickup_id: item.id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            getStaffPickups()
        } catch (err) {
            alert('Something went wrong')
            console.error(err)
        }
    }

    const getStaffPickups = async () => {
        let token = localStorage.getItem('accessToken')
        try {
            const res = await axios.get("http://localhost:8000/api/donor/request/details", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setItems(res.data)
        } catch (err) {
            alert('Something went wrong')
            console.error(err)
        }
    }
    const getVolunteers = async () => {
        let token = localStorage.getItem('accessToken')
        try {
            const res = await axios.get("http://localhost:8000/api/center/volunteers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setVolunteers(res.data)
        } catch (err) {
            alert('Something went wrong')
            console.error(err)
        }
    }

    React.useEffect(() => {
        getStaffPickups()
        getVolunteers()
    }, [])

    const renderDashboard = (pathname) => {
        if (pathname === '/beneficiary-requests') return <BenificiaryRequestList />
        else if (pathname === '/new-center-request') return <CenterRequestForm goBack={() => router.navigate('/center-request')} />
        else if (pathname === '/center-request') return <CenterRequestList />
        else if (pathname === '/inventory') return <InventoryView />
        else return <StaffPickupList afterReceiveFn={setReceived} items={items} volunteers={volunteers} afterSelectFn={assignVolunteer} />
    }

    return (
        // preview-start
        <AppProvider
            navigation={staffNavigation}
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

StaffDashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default StaffDashboard;

